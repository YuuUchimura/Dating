import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoogleMapReact from "google-map-react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { db } from "../../config/firebase";
import { getUserIcon } from "../../utils/getUserIcon";
import { setDoc, doc, increment, deleteDoc } from "firebase/firestore";
import arrow from "../../images/arrow.png";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

//プロフィールページの投稿
export const MyPostCard = ({
  id,
  user,
  currentPost,
  i,
  myAddress,
  deletePost,
}) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [expanded, setExpanded] = useState(false);
  const [isOpenImage, setOpenIsImage] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(myAddress[0]?.addresses);
  const [favorite, setFavorite] = useState(
    currentPost.favoUsers ? currentPost.favoUsers.includes(user.uid) : false
  );
  const [icon, setIcon] = useState(null);

  const click = (q) => {
    deletePost(q);
    handleClose();
  };

  const favo = (currentPost) => {
    if (favorite) {
      deleteDoc(doc(db, `user/${user.uid}/favoPlans/${currentPost.id}`));
      setDoc(
        doc(db, `DatePlan/${currentPost.id}`),
        {
          favoTimes: increment(-1),
          favoUsers: currentPost.favoUsers?.filter((uid) => {
            return uid !== user.uid;
          }),
        },
        { merge: true }
      );
    } else {
      setDoc(doc(db, `user/${user.uid}/favoPlans/${currentPost.id}`), {
        createdTime: new Date(),
      });
      setDoc(
        doc(db, `DatePlan/${currentPost.id}`),
        {
          favoTimes: increment(1),
          favoUsers: currentPost.favoUsers
            ? [...currentPost.favoUsers, user.uid]
            : [user.uid],
        },
        { merge: true }
      );
    }
    setFavorite(!favorite);
  };

  const changeViewMap = (addressId, id) => {
    if (isOpenImage) {
      setOpenIsImage(!isOpenImage);
      setCurrentAddress(myAddress[id].addresses[addressId].location);
    } else {
      setOpenIsImage(!isOpenImage);
    }
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleApiLoaded = ({ map, maps }) => {
    new maps.Marker({
      map,
      position: currentAddress,
    });
  };

  useEffect(() => {
    getUserIcon(currentPost.userid).then((data) => {
      setIcon(data);
    });
  }, [currentPost]);

  return (
    <>
      <div className="font-Skia w-11/12 md:w-5/12 mx-auto my-10 text-xl">
        <div className="rounded-lg py-5 bg-white shadow-xl">
          <div className="flex justify-between items-center px-5">
            <div className="flex items-center">
              <Link to={`/profile/${currentPost.userid}`}>
                <Avatar src={icon}></Avatar>
              </Link>
              <h1 className="pl-10 text-lg">{currentPost.title}</h1>
            </div>
            <>
              {user.uid === id ? (
                <IconButton onClick={handleOpen}>
                  <MoreVertIcon />
                </IconButton>
              ) : null}
              <Modal open={open} onClose={handleClose}>
                <div className="flex flex-col mx-auto rounded-md shadow-md items-center p-4 w-52 mt-36 bg-white border">
                  <div>投稿を削除しますか？</div>
                  <div>
                    <Button onClick={() => click(currentPost.id)}>削除</Button>
                  </div>
                </div>
              </Modal>
            </>
          </div>
          <div className="px-5">
            {isOpenImage ? (
              <img
                className="my-5 h-72 flex justify-center mx-auto"
                src={currentPost.img}
                alt="イメージ画像"
              />
            ) : (
              <div className="h-72 my-5">
                <GoogleMapReact
                  bootstrapURLKeys={{
                    key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                  }}
                  defaultCenter={currentAddress}
                  defaultZoom={15}
                  onGoogleApiLoaded={handleApiLoaded}
                />
              </div>
            )}
            <div className="flex justify-between">
              <div className="p-1 w-32 rounded-full bg-gray-200">
                {currentPost.genre}
              </div>
              <>
                {/* <IconButton> */}
                {favorite ? (
                  <FavoriteIcon
                    onClick={() => {
                      favo(currentPost);
                    }}
                    sx={{ color: red[500] }}
                  />
                ) : (
                  <FavoriteIcon
                    onClick={() => {
                      favo(currentPost);
                    }}
                  />
                )}
              </>
              {/* </IconButton> */}
            </div>
            <div className="flex flex-col justify-around">
              {currentPost.addresses?.map((item, i) => (
                <div key={i}>
                  <div
                    onClick={() => changeViewMap(item.id - 1, i)}
                    id={i}
                    className="cursor-pointer mx-auto"
                  >
                    {item.name}
                  </div>
                  {2 > i && currentPost.addresses[i + 1].name && (
                    <div className="my-2">
                      <img src={arrow} className="h-5 w-5 mx-auto" alt="" />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <ExpandMore onClick={handleExpandClick}>
              {expanded ? (
                <p className="text-blue-700 hover:opacity-70 text-lg cursor-pointer">
                  閉じる
                </p>
              ) : (
                <p className="text-blue-700 hover:opacity-70 text-lg cursor-pointer">
                  どんなデートかみたい！
                </p>
              )}
            </ExpandMore>
            <Collapse in={expanded}>
              <p>{currentPost.description}</p>
              <br />
              <p>
                <span className="font-Skia rounded-full text-md bg-blue-400 m-0 px-1 py-1 text-white">
                  移動のポイント
                </span>
                {currentPost.movePoint}
              </p>
            </Collapse>
          </div>
        </div>
      </div>
    </>
  );
};
