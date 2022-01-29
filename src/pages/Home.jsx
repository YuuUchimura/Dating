//components
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import firebase from "../config/firebase";
import { Post } from "./templates/post";

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

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    firebase
      .firestore()
      .collection("DatePlan")
      .onSnapshot((snapshot) => {
        const plans = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setPlans(plans);
      });
  }, []);

  const user = useContext(AuthContext);

  return (
    <>
      <h1>Home</h1>
      <Post />
      <ul>
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
                subheader="September 14, 2016"
              />
              <CardMedia
                component="img"
                height="194"
                image="/static/images/cards/paella.jpg"
                alt="Paella dish"
              />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {}
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
                  <Typography paragraph>
                    {plan.comment}
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </>
        ))}
      </ul>
      <button onClick={() => firebase.auth().signOut()}>ログアウト</button>
    </>
  );
};
