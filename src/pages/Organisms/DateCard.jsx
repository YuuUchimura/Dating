import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoogleMapReact from "google-map-react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { setDoc, doc, increment, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
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

export const DateCard = ({ user, post }) => {
  const [expanded, setExpanded] = useState(false);
  const sellectAddresses = post.addresses;
  const [isOpenImage, setOpenIsImage] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(post.addresses[0]);
  const [favorite, setFavorite] = useState(false);
  const [icon, setIcon] = useState(null);

  const getUserIcon = async (userId) => {
    const user = await getDoc(doc(db, `user/${userId}`));
    return user.data().img;
  };

  useEffect(() => {
    getUserIcon(post.userid).then((data) => {
      setIcon(data);
    });
    const getFavoId = async () => {
      const FavoRef = doc(db, "user", user.uid, "favoPlans", post.id);
      const docSnap = await getDoc(FavoRef);
      if (docSnap.exists()) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    };
    getFavoId();
  }, [post, user]);

  const favo = (post) => {
    if (favorite) {
      deleteDoc(doc(db, `user/${user.uid}/favoPlans/${post.id}`));
      setDoc(
        doc(db, `DatePlan/${post.id}`),
        {
          favoTimes: increment(-1),
          favoUsers: post.favoUsers?.filter((uid) => {
            return uid !== user.uid;
          }),
        },
        { merge: true }
      );
    } else {
      setDoc(doc(db, `user/${user.uid}/favoPlans/${post.id}`), {
        createdTime: new Date(),
      });
      setDoc(
        doc(db, `DatePlan/${post.id}`),
        {
          favoTimes: increment(1),
          favoUsers: post.favoUsers
            ? [...post.favoUsers, user.uid]
            : [user.uid],
        },
        { merge: true }
      );
    }
    setFavorite(!favorite);
  };

  const changeViewMap = (id) => {
    if (isOpenImage) {
      setOpenIsImage(!isOpenImage);
      setCurrentAddress(sellectAddresses[id]);
    } else {
      if (currentAddress.id === id) {
        setOpenIsImage(!isOpenImage);
      }
    }
  };
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleApiLoaded = ({ map, maps }) => {
    new maps.Marker({
      map,
      position: currentAddress.location,
    });
  };

  return (
    <>
      <div className="w-11/12 md:w-5/12 mx-auto mb-10 text-xl ">
        <div className="rounded-lg py-5 px-5 w-full bg-white shadow-xl">
          <div className="flex items-center">
            <Link to={`/profile/${post.userid}`}>
              <Avatar src={icon}></Avatar>
            </Link>
            <h1 className="pl-10 text-xl">{post.title}</h1>
          </div>
          {isOpenImage ? (
            <img
              className="my-5 h-72 flex justify-center mx-auto"
              src={post.img}
              alt="投稿画像"
            />
          ) : (
            <div className="h-72 my-5">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={currentAddress.location}
                defaultZoom={15}
                onGoogleApiLoaded={handleApiLoaded}
              />
            </div>
          )}
          <div className="flex justify-between">
            <div className="my-5 p-1 w-24 rounded-full bg-gray-200">
              {post.genre}
            </div>
            <IconButton>
              {favorite ? (
                <FavoriteIcon
                  onClick={() => {
                    favo(post);
                  }}
                  sx={{ color: red[500] }}
                  className="cursor-pointer"
                />
              ) : (
                <FavoriteIcon
                  onClick={() => {
                    favo(post);
                  }}
                  className="cursor-pointer"
                />
              )}
            </IconButton>
          </div>
          <div className="text-lg flex flex-col justify-around">
            {sellectAddresses.map((sellectAddress, i) => (
              <>
                <div
                  onClick={() => changeViewMap(sellectAddress.id - 1)}
                  id={i}
                  key={i}
                  className="cursor-pointer mx-auto"
                >
                  {sellectAddress.name}
                </div>
                {2 > i && sellectAddresses[i + 1].name && (
                  <div className="my-2">
                    <img src={arrow} className="h-5 w-5 mx-auto" alt="" />
                  </div>
                )}
              </>
            ))}
          </div>
          <ExpandMore onClick={handleExpandClick}>
            <p className="text-blue-700 hover:opacity-70 text-lg cursor-pointer">
              どんなデートかみたい！
            </p>
          </ExpandMore>
          <Collapse in={expanded}>
            <p>{post.description}</p>
            <p>移動のポイント：{post.movePoint}</p>
          </Collapse>
        </div>
      </div>
    </>
  );
};
