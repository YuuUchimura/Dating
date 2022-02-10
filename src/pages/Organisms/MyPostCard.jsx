import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import GoogleMapReact from "google-map-react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { db } from "../../config/firebase";
import {
  setDoc,
  doc,
  increment,
  deleteDoc,
  query,
  onSnapshot,
  collection,
  getDocs,
  getDoc,
  where,
} from "firebase/firestore";

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
};
//プロフィールページの投稿
export const MyPostCard = ({ user, currentPost, i, myAddress, deletePost }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [expanded, setExpanded] = useState(false);
  const [isOpenImage, setOpenIsImage] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(myAddress[0]?.addresses);
  const [favorite, setFavorite] = useState(
    currentPost.favoUsers ? currentPost.favoUsers.includes(user.uid) : false
  );
  const click = (q) => {
    deletePost(q);
  };

  const favo = () => {
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

  const style = {
    display: "flex",
    justifyContent: "cetnter",
    alignItems: "center",
    flexDirection: "column",
    margin: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    width: "230px",
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

  return (
    <div className="my-10 w-6/12 shadow-xl">
      <Card sx={MediaStyle}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }}></Avatar>}
          action={
            <>
              <Button onClick={handleOpen}>
                <MoreVertIcon />
              </Button>
              <Modal open={open} onClose={handleClose}>
                <Box sx={style}>
                  <div className="flex flex-col">
                    <div>投稿を削除しますか？</div>
                    <div>
                      <Button onClick={() => click(currentPost.id)}>
                        削除
                      </Button>
                    </div>
                  </div>
                </Box>
              </Modal>
            </>
          }
          title={currentPost.title}
          sx={{ fontsize: "15px" }}
        />
        <div className="flex justify-around">
          {currentPost.addresses.map((item, b) => {
            return (
              <span
                key={b}
                onClick={() => changeViewMap(item.id - 1, i)}
                className="mr-2"
              >
                {item.name}
                {/* {console.log(item)} */}
              </span>
            );
          })}
        </div>
        {isOpenImage ? (
          <CardMedia component="img" image={currentPost.img} />
        ) : (
          <div style={{ height: "345px" }}>
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
        <CardContent>
          <div className="w-20 rounded-full bg-gray-200">
            {currentPost.genre}
          </div>
        </CardContent>
        <CardActions disableSpacing>
          {favorite ? (
            <FavoriteIcon
              onClick={() => {
                favo();
              }}
              sx={{ color: red[500] }}
            />
          ) : (
            <FavoriteIcon
              onClick={() => {
                favo();
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
            <Typography paragraph>{currentPost.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
