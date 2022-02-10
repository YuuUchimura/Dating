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
import GoogleMapReact from "google-map-react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";

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
  height: "345px",
  width: "345px",
};

export const ChoiceDateCard = ({ choiceValue }) => {
  const [expanded, setExpanded] = useState(false);
  const [changeViewMaps, setChangeViewMaps] = useState(choiceValue.addresses);
  const [isOpenImage, setOpenIsImage] = useState(true);
  const [currentSellectAddress, setCurrentSellectAddress] = useState(
    choiceValue.addresses[0]
  );

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
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
          title={choiceValue.title}
        />
        {changeViewMaps.map((sellectAddress, i) => (
          <div className="flex justify-around">
            <span key={i} onClick={() => changeViewMap(sellectAddress.id - 1)}>
              {sellectAddress.name}
            </span>
          </div>
        ))}
        {isOpenImage ? (
          <CardMedia component="img" sx={MediaStyle} image={choiceValue.img} />
        ) : (
          <div style={{ height: "345px" }}>
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
        <CardContent>
          <div className="w-20 rounded-full bg-gray-200">
            {choiceValue.genre}
          </div>
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
            <Typography paragraph>{choiceValue.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
