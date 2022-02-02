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

export const DateCard = ({ plan }) => {
  const [images, setImages] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const s = () => {
    setImages(!images);
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={<Avatar sx={{ bgcolor: red[500] }}>R</Avatar>}
          title={plan.title}
        />
        {/* <span onClick={s}>{plan.}</span> */}
        {/* <span onClick={s}>{plan.address2}</span>
        <span onClick={s}>{plan.address3}</span> */}
        {images ? (
          <CardMedia component="img" sx={MediaStyle} image={plan.img} />
        ) : (
          <div style={{ height: "345px" }}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
              }}
              defaultCenter={{ lat: plan.location.lat, lng: plan.location.lng }}
              defaultZoom={15}
            />
          </div>
        )}
        <CardContent>
          <Typography>
            <div className="w-20 rounded-full bg-gray-200">{plan.genre}</div>
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
    </div>
  );
};
