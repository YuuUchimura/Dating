import React, { useState, useEffect } from "react";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import GoogleMapReact from "google-map-react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { setDoc, doc, increment, deleteDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
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

export const ChoiceDateCard = ({ choiceValue, user }) => {
  const [expanded, setExpanded] = useState(false);
  const changeViewMaps = choiceValue.addresses;
  const [isOpenImage, setOpenIsImage] = useState(true);
  const [favorite, setFavorite] = useState(false);
  const [currentSellectAddress, setCurrentSellectAddress] = useState(
    choiceValue.addresses[0]
  );
  const [icon, setIcon] = useState(null);

  const favo = (choiceValue) => {
    if (favorite) {
      deleteDoc(doc(db, `user/${user.uid}/favoPlans/${choiceValue.id}`));
      setDoc(
        doc(db, `DatePlan/${choiceValue.id}`),
        {
          favoTimes: increment(-1),
          favoUsers: choiceValue.favoUsers?.filter((uid) => {
            return uid !== user.uid;
          }),
        },
        { merge: true }
      );
    } else {
      setDoc(doc(db, `user/${user.uid}/favoPlans/${choiceValue.id}`), {
        createdTime: new Date(),
      });
      setDoc(
        doc(db, `DatePlan/${choiceValue.id}`),
        {
          favoTimes: increment(1),
          favoUsers: choiceValue.favoUsers
            ? [...choiceValue.favoUsers, user.uid]
            : [user.uid],
        },
        { merge: true }
      );
    }
    setFavorite(!favorite);
  };

  useEffect(() => {
    getUserIcon(choiceValue.userid).then((data) => {
      setIcon(data);
    });
  }, [choiceValue]);

  const changeViewMap = (id) => {
    if (isOpenImage) {
      setOpenIsImage(!isOpenImage);
      setCurrentSellectAddress(changeViewMaps[id]);
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
      position: currentSellectAddress.location,
    });
  };

  return (
    <>
      <div className="font-Skia w-11/12 md:w-5/12 mx-auto mb-10 text-xl ">
        <div className="rounded-lg py-5 px-5 w-full bg-white shadow-xl">
          <div className="flex items-center">
            <Link to={`/profile/${choiceValue.userid}`}>
              <Avatar src={icon}></Avatar>
            </Link>
            <h1 className="pl-10 text-xl">{choiceValue.title}</h1>
          </div>
          {isOpenImage ? (
            <img
              className="my-5 h-72 flex justify-center mx-auto"
              src={choiceValue.img}
              alt="選択した画像"
            />
          ) : (
            <div className="h-72 my-5">
              <GoogleMapReact
                bootstrapURLKeys={{
                  key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                }}
                defaultCenter={currentSellectAddress.location}
                defaultZoom={15}
                onGoogleApiLoaded={handleApiLoaded}
              />
            </div>
          )}
          <div className="flex justify-between">
            <div className="my-5 p-1 w-24 rounded-full bg-gray-200">
              {choiceValue.genre}
            </div>
            <IconButton>
              {favorite ? (
                <FavoriteIcon
                  onClick={() => {
                    favo(choiceValue);
                  }}
                  sx={{ color: red[500] }}
                />
              ) : (
                <FavoriteIcon
                  onClick={() => {
                    favo(choiceValue);
                  }}
                />
              )}
            </IconButton>
          </div>
          <div className="flex flex-col justify-around">
            {changeViewMaps.map((sellectAddress, i) => (
              <>
                <div
                  onClick={() => changeViewMap(sellectAddress.id - 1)}
                  id={i}
                  key={i}
                  className="cursor-pointer mx-auto"
                >
                  {sellectAddress.name}
                </div>

                {2 > i && changeViewMaps[i + 1].name && (
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
            <p>{choiceValue.description}</p>
            <p>移動のポイント：{choiceValue.movePoint}</p>
          </Collapse>
        </div>
      </div>
    </>
  );
};
