import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoogleMapReact from "google-map-react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { db } from "../../config/firebase";
import { setDoc, doc, increment, deleteDoc } from "firebase/firestore";
import { getUserIcon } from "../../utils/getUserIcon";

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
export const FavoPostCard = ({ myAddress, i, user, favoPost }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOpenImage, setOpenIsImage] = useState(true);
  const [favoAddress, setFavoAddress] = useState(myAddress[0]?.addresses);
  const [favorite, setFavorite] = useState(
    favoPost.favoUsers ? favoPost.favoUsers.includes(user.uid) : false
  );
  const [icon, setIcon] = useState(null);

  const favo = (favoPost) => {
    if (favorite) {
      deleteDoc(doc(db, `user/${user.uid}/favoPlans/${favoPost.id}`));
      setDoc(
        doc(db, `DatePlan/${favoPost.id}`),
        {
          favoTimes: increment(-1),
          favoUsers: favoPost.favoUsers?.filter((uid) => {
            return uid !== user.uid;
          }),
        },
        { merge: true }
      );
    } else {
      setDoc(doc(db, `user/${user.uid}/favoPlans/${favoPost.id}`), {
        createdTime: new Date(),
      });
      setDoc(
        doc(db, `DatePlan/${favoPost.id}`),
        {
          favoTimes: increment(1),
          favoUsers: favoPost.favoUsers
            ? [...favoPost.favoUsers, user.uid]
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
      setFavoAddress(myAddress[id].addresses[addressId].location);
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
      position: favoAddress,
    });
  };

  useEffect(() => {
    getUserIcon(favoPost.userid).then((data) => {
      setIcon(data);
    });
  }, [favoPost]);

  return (
    <>
      <div className="font-Skia w-11/12 md:w-5/12 mx-auto my-10 text-xl">
        <div className="rounded-lg py-5 px-5 bg-white shadow-xl">
          <div className="flex items-center">
            <Link to={`/profile/${favoPost.userid}`}>
              <Avatar src={icon}></Avatar>
            </Link>
            <h1 className="pl-10 text-xl">{favoPost.title}</h1>
          </div>
          {isOpenImage ? (
            <img
              className="my-5 h-72 flex justify-center mx-auto"
              src={favoPost.img}
              alt="いいねした画像"
            />
          ) : (
            <div className="h-72 my-5">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={favoAddress}
                defaultZoom={15}
                onGoogleApiLoaded={handleApiLoaded}
              />
            </div>
          )}
          <div className="flex justify-between items-center">
            <div className="p-1 w-40 rounded-full bg-gray-200">
              {favoPost.genre}
            </div>
            {/* <IconButton> */}
            {favorite ? (
              <FavoriteIcon
                onClick={() => {
                  favo(favoPost);
                }}
                sx={{ color: red[500] }}
                className="cursor-pointer"
              />
            ) : (
              <FavoriteIcon
                onClick={() => {
                  favo(favoPost);
                }}
                className="cursor-pointer"
              />
            )}
            {/* </IconButton> */}
          </div>
          <div className="flex flex-col justify-around">
            {favoPost.addresses?.map((item, i) => (
              <div key={i}>
                <div
                  onClick={() => changeViewMap(item.id - 1, i)}
                  id={i}
                  className="cursor-pointer mx-auto"
                >
                  {item.name}
                </div>
                {2 > i && favoPost.addresses[i + 1].name && (
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
                とじる
              </p>
            ) : (
              <p className="text-blue-700 hover:opacity-70 text-lg cursor-pointer">
                どんなデートかみたい！
              </p>
            )}
          </ExpandMore>
          <Collapse in={expanded}>
            <p>{favoPost.description}</p>
            <br />
            <p>
              <span className="font-Skia rounded-full text-md bg-blue-400 m-0 px-1 py-1 text-white">
                移動のポイント
              </span>
              {favo.movePoint}
            </p>
          </Collapse>
        </div>
      </div>
    </>
  );
};
