import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthService";
import GoogleMapReact from "google-map-react";
import { SearchAndMap1 } from "../molequres/SearchAndMap1";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { PostTextField } from "../molequres/PostTextField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { IconButton } from "@mui/material";
import { randomStr } from "../../utils/randomStr";
import { addDoc, query, collection, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";

const CommentPlaceholder =
  "詳細やおすすめのルート（裏道、食べ歩きスポット等）を記載してください";
export const Post = () => {
  const [title, setTitle] = useState("");
  const [SubTitle, setSubTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  const [address, setAddress] = useState("");
  const [address2, setAddress2] = useState("");
  const [address3, setAddress3] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);
  const [lat2, setLat2] = useState(null);
  const [lng2, setLng2] = useState(null);
  const [lat3, setLat3] = useState(null);
  const [lng3, setLng3] = useState(null);
  const [imageIsSelected, setImageIsSelected] = useState(false);
  const [prevAvatar, setPrevAvatar] = useState("");
  const [open, setOpen] = React.useState(false);
  const [route1, setRoute1] = useState("");
  const [route2, setRoute2] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const DateRef = "DatePlan";
    const ARef = collection(db, DateRef);
    const q = query(ARef);

    if (img) {
      const randomChar = randomStr();
      const fileName = randomChar + "_" + img.name;
      const imageRef = `images/${fileName}`;

      const uploadMsgImage = uploadBytesResumable(ref(storage, imageRef), img);

      uploadMsgImage.on(
        "state_changed",
        () => {},
        (err) => {
          alert(err.message);
        },
        async () => {
          await getDownloadURL(ref(storage, imageRef)).then(async (url) => {
            addDoc(ARef, {
              user: user.displayName,
              userid: user.uid,
              title: title,
              img: url,
              address: address,
              address2: address2,
              address3: address3,
              route1: route1,
              route2: route2,
              lat: lat,
              lng: lng,
              lat2: lat2,
              lng2: lng2,
              lat3: lat3,
              lng3: lng3,
              descriptipn: description,
              timeStamp: serverTimestamp(),
            });
          });
        }
      );
    }
    setTitle("");
    setImg("");
    setAddress("");
    setAddress2("");
    setLat("");
    setLng("");
    setLat2("");
    setLng2("");
    setDescription("");
    handleClose();
  };

  const buttonStyle = {
    backgroundColor: "#ff00ff",
    "&:hover": {
      backgroundColor: "#ff00ff",
      opacity: 0.8,
    },
  };

  const style = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "cetnter",
    alignItems: "center",
    margin: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    height: "90vh",
    overflow: "scroll",
    width: "50vw",
  };
  const previewFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target.result;
      setPrevAvatar(imageUrl);
    };
    reader.readAsDataURL(file);
  };

  const onChangeImageHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      previewFile(file);
      setImg(file);
      setImageIsSelected(true);
      e.target.value = "";
    }
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
          <h1 className="mt-5 text-2xl">デートプラン</h1>
          <form>
            <div>
              <PostTextField
                label={"タイトル"}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div>
              <PostTextField
                label={"サブタイトル"}
                onChange={(e) => setSubTitle(e.target.value)}
                value={SubTitle}
              />
            </div>
            <div>
              <Box className="text-left">
                <IconButton>
                  <label>
                    <input
                      className="text-center hidden"
                      type="file"
                      onChange={onChangeImageHandler}
                    />
                    <div className="flex">
                      {imageIsSelected ? (
                        <img width={50} src={prevAvatar.toString()} />
                      ) : (
                        <AddPhotoAlternateIcon />
                      )}
                      プレビューで選択
                    </div>
                  </label>
                </IconButton>
              </Box>
            </div>
            <div>
              タグ
              <select name="genre">
                <option value="man"></option>
              </select>
            </div>
            <SearchAndMap1
              label={"デートスポット１"}
              setLat={setLat}
              setLng={setLng}
              address={address}
              setAddress={setAddress}
            />
            <div className="my-5">
              <PostTextField
                id={"time"}
                label={"１から２の時間"}
                type={"time"}
                defaultValue={"00:00"}
                variant={"standard"}
                width={"13vh"}
                onChange={(e) => setRoute1(e.target.value)}
              />
            </div>
            <SearchAndMap1
              label={"デートスポット２"}
              setLat={setLat2}
              setLng={setLng2}
              address={address2}
              setAddress={setAddress2}
            />
            <div className="my-5">
              <PostTextField
                id={"time"}
                label={"２から３の時間"}
                type={"time"}
                defaultValue={"00:00"}
                variant={"standard"}
                width={"13vh"}
                onChange={(e) => setRoute2(e.target.value)}
              />
            </div>
            <SearchAndMap1
              label={"デートスポット３"}
              setLat={setLat3}
              setLng={setLng3}
              address={address3}
              setAddress={setAddress3}
            />

            <div className="my-5">
              <PostTextField
                id={"outlined-multiline-static"}
                label={"デート詳細"}
                placeholder={CommentPlaceholder}
                // variant={"outline"}
                multiline
                rows={4}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
          <div className="mb-5">
            <Button sx={buttonStyle} variant="contained" onClick={handleSubmit}>
              送信
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};
