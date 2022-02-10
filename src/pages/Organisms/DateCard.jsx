import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { pink, red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoogleMapReact from "google-map-react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import {
  setDoc,
  doc,
  increment,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";

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
const MediaStyle = {
  backgroundColor: "#ffe0e0",
  width: "500px",
};

export const DateCard = ({ user, post, }) => {
  const [expanded, setExpanded] = useState(false);
  const [sellectAddresses, setSellectAddresses] = useState(post.addresses);
  const [isOpenImage, setOpenIsImage] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(post.addresses[0]);
  const [favorite, setFavorite] = useState(false);

  const getFavoId = async () => {
    const FavoRef = doc(db, "user", user.uid, "favoPlans", post.id);
    const docSnap = await getDoc(FavoRef);
    if (docSnap.exists()) {
      setFavorite(true);
    } else {
      setFavorite(false);
    }
  };
  useEffect(() => {
    getFavoId();
  }, []);

  const favo = (post) => {
    if (favorite) {
      deleteDoc(doc(db, `user/${user.uid}/favoPlans/${post.id}`));
      setDoc(
        doc(db, `DatePlan/${post.id}`),
        {
          favoTimes: increment(-1),
          favoUsers: post.favoUsers?.filter(( uid ) => {
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
  const imageStyle = {
    borderRadius: "50%",
  };

  return (
    <>
      <div className="my-10 w-6/12 shadow-xl">
        <Card sx={MediaStyle}>
          <CardHeader
            avatar={
              <Link to={`/profile/${post.userid}`}>
                <Avatar sx={{ bgcolor: pink[200] }}></Avatar>
              </Link>
            }
            title={<h1 className="flex text-xl">{post.title}</h1>}
          />
          <div className="text-sm flex justify-around">
            {sellectAddresses.map((sellectAddress, i) => (
              <div
                id={i}
                onClick={() => changeViewMap(sellectAddress.id - 1)}
                key={i}
              >
                {sellectAddress.name}
              </div>
            ))}
          </div>
          {isOpenImage ? (
            <CardMedia
              style={{ height: "300px" }}
              component="img"
              image={post.img}
            />
          ) : (
            <div style={{ height: "300px" }}>
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
          <CardContent>
            <div className="w-20 rounded-full bg-gray-200">{post.genre}</div>
          </CardContent>
          <CardActions disableSpacing>
            {favorite ? (
              <FavoriteIcon
                onClick={() => {
                  favo(post);
                }}
                sx={{ color: red[500] }}
              />
            ) : (
              <FavoriteIcon
                onClick={() => {
                  favo(post);
                }}
              />
            )}
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>{post.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </>
  );
};
