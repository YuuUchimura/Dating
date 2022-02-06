import React, { useState} from "react";
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

export const PostCard = ({ currentPost, i, myAddress }) => {
  const [expanded, setExpanded] = useState(false);
  const [isOpenImage, setOpenIsImage] = useState(true);
  const [currentAddress, setCurrentAdress] = useState(myAddress[0]?.addresses);

  const changeViewMap = (addressId, id) => {
    console.log(addressId);
    console.log(myAddress);
    if (isOpenImage) {
      setOpenIsImage(!isOpenImage);
      setCurrentAdress(myAddress[id].addresses[addressId].location);
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
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
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
            <Typography paragraph>{currentPost.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
