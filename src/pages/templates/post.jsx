import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../AuthService";
import firebase from "../../config/firebase";
import GoogleMapReact from "google-map-react";
import { SearchAndMap1 } from "../molequres/SearchAndMap1";
import { SearchAndMap2 } from "../molequres/SearchAndMap2";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

export const Post = () => {
  const [title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [comment, setComment] = useState("");
  const [img, setImg] = useState("");
  const [address, setAddress] = useState(null);
  const [address2, setAddress2] = useState(null);
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [lat2, setLat2] = useState(null);
  const [lng2, setLng2] = useState(null);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase.firestore().collection("DatePlan").add({
      user: user.displayName,
      userid: user.uid,
      title: title,
      img: img,
      address: address,
      address2: address2,
      lat: lat,
      lng: lng,
      lat2: lat2,
      lng2: lng2,
      comment: comment,
    });
    setTitle("");
    setImg("");
    setAddress("");
    setAddress2("");
    setLat("");
    setLng("");
    setLat2("");
    setLng2("");
    setComment("");
    handleClose();
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <div>
      <Button onClick={handleOpen}>投稿</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <form>
            <TextField
              required
              id="standard-required"
              label="タイトル"
              variant="standard"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              required
              id="standard-required"
              label="サブタイトル"
              variant="standard"
              value={SubTitle}
              onChange={(e) => setSubTitle(e.target.value)}
            />
            <TextField
              required
              id="standard-required"
              label="写真"
              variant="standard"
              value={img}
              onChange={(e) => setImg(e.target.value)}
            />
            <SearchAndMap1
              setLat={setLat}
              setLng={setLng}
              address={address}
              setAddress={setAddress}
            />
            <SearchAndMap2
              setLat={setLat2}
              setLng={setLng2}
              address={address2}
              setAddress={setAddress2}
            />
            <h1>コメント</h1>
            <textarea
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
          <button type="submit" onClick={handleSubmit}>
            送信
          </button>
        </Box>
      </Modal>
    </div>
  );
};
