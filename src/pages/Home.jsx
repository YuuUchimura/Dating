//components
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import { db, auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { query, onSnapshot, collection, orderBy } from "firebase/firestore";
import { Post } from "./templates/post";

import GoogleMapReact from "google-map-react";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

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

export const Home = () => {
  const [plans, setPlans] = useState([]);
  const [images, setImages] = useState(true);
  const [expanded, setExpanded] = React.useState(false);
  const [map, setMap] = useState(null);
  const [maps, setMaps] = useState(null);
  const [geocoder, setGeocoder] = useState(null);

  const handleApiLoaded = (obj) => {
    setMap(obj.map);
    setMaps(obj.maps);
    setGeocoder(new obj.maps.Geocoder());
  };


  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const MediaStyle = {
    height: "345px",
    width: "345px",
  };

  useEffect(() => {
    const q = query(collection(db, "DatePlan"), orderBy("timeStamp", "desc"));
    onSnapshot(q, (snapshot) => {
      const plans = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setPlans(plans);
    });
  }, []);

  const user = useContext(AuthContext);

  const s = () => {
    setImages(!images);
  };

  return (
    <>
      <h1>Home</h1>
      <Post />
      <ul className="mx-auto">
        {plans.map((plan) => (
          <>
            <Card sx={{ maxWidth: 345 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                  </Avatar>
                }
                title={plan.title}
                subheader={plan.address}
              />
              <span onClick={s}>ボタン</span>
              {images ? (
                <CardMedia
                  component="img"
                  sx={MediaStyle}
                  image={plan.img}
                  alt="Paella dish"
                />
              ) : (
                <div
                  style={{ margin: "0 auto", height: "100px", width: "90%" }}
                >
                  <GoogleMapReact
                    bootstrapURLKeys={{
                      key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
                    }}
                    defaultCenter={{ lat: plan.lat, lng: plan.lng }}
                    defaultZoom={15}
                    onGoogleApiLoaded={handleApiLoaded}
                  />
                </div>
              )}
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {plan.SubTitle}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
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
                  <Typography paragraph>{plan.comment}</Typography>
                </CardContent>
              </Collapse>
            </Card>
          </>
        ))}
      </ul>
      <button onClick={() => signOut(auth)}>ログアウト</button>
    </>
  );
};
