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

export const DateCard = ({ plan }) => {
  const [expanded, setExpanded] = useState(false);
  const [sellectAddresses, setSellectAddresses] = useState(plan.addresses);
  const [isOpenImage, setOpenIsImage] = useState(true);
  const [currentAddress, setCurrentAddress] = useState(plan.addresses[0]);
  const [toogle, setToggle] = useState(false);

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
  const toggleF = () => {
    setToggle(!toogle);
  };

  return (
    <>
      <div className="my-10 w-6/12 shadow-xl">
        <Card sx={MediaStyle}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: red[500] }}></Avatar>}
            title={plan.title}
            sx={{ fontsize: "15px" }}
          />
          {sellectAddresses.map((sellectAddress, i) => (
            <div key={i} className="flex justify-around">
              <span
                className="flex"
                id={i}
                onClick={() => changeViewMap(sellectAddress.id - 1)}
              >
                {sellectAddress.name}
              </span>
            </div>
          ))}
          {isOpenImage ? (
            <CardMedia component="img" image={plan.img} />
          ) : (
            <div style={{ height: "345px" }}>
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
            <div className="w-20 rounded-full bg-gray-200">{plan.genre}</div>
          </CardContent>
          <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
              <FavoriteIcon />
            </IconButton>
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
              <Typography paragraph>{plan.description}</Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    </>
  );
};
