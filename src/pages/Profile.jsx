//components
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import { db, auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { query, onSnapshot, collection, orderBy } from "firebase/firestore";
import { Post } from "./templates/post";
import { Link } from "react-router-dom";

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

const Profile = () => {
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
      <div className="w-10/12 mx-auto">
        <header className="h-12 flex justify-between">
          <div>ロゴ</div>
          {/* <img src="" alt="" /> */}
          <div>
            <button onClick={() => signOut(auth)}>ログアウト</button>
          </div>
        </header>
        <main>
          <div className="h-48 flex items-center justify-between">
            <div>
              <div>
                プロフィール画像
                {/* <img src="" alt="" /> */}
              </div>
              <div>{user.displayName}</div>
            </div>

            <div className="leading-8">
              <div className="">プロフィール編集</div>
              <div>
                <span>投稿数●件</span>
                <span>フォロー数●人</span>
                <span>フォロワー数●人</span>
              </div>
              <div>
                <h3>自己紹介</h3>
                <div>本文</div>
              </div>
            </div>
          </div>
          <div className="flex justify-around">
            <span>投稿</span>
            <span>Dateしたい</span>
          </div>
          <div className="flex justify-center items-center">
            <ul className="mx-auto">
              {plans.map((plan) => (
                <>
                  <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                      avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
                      title={plan.title}
                    />
                    <span onClick={s}>{plan.address}</span>
                    {images ? (
                      <CardMedia
                        component="img"
                        sx={MediaStyle}
                        image={plan.img}
                      />
                    ) : (
                      <div style={{ height: "345px" }}>
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
          </div>
          <Link to="/profile">Profile</Link>
        </main>
      </div>
    </>
  );
};

export default Profile;
