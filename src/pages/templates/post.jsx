import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthService";
import { SearchAndMap1 } from "../molequres/SearchAndMap1";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { PostTextField } from "../molequres/PostTextField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { IconButton } from "@mui/material";
import { randomStr } from "../../utils/randomStr";
import {
  setDoc,
  doc,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { DateGenre } from "../atoms/DateGenre";
import { nanoid } from "nanoid";

const CommentPlaceholder =
  "デート詳細やおすすめのルート（裏道、食べ歩きスポット、交通手段、移動時間等）の記載をお願いします。";
export const Post = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [img, setImg] = useState("");
  // const [route, setRoute] = useState("");
  const [addresses, setAddressees] = useState([
    { location: { lat: null, lng: null }, name: "", id: 1 },
    { location: { lat: null, lng: null }, name: "", id: 2 },
    { location: { lat: null, lng: null }, name: "", id: 3 },
  ]);

  const [imageIsSelected, setImageIsSelected] = useState(false);
  const [prevAvatar, setPrevAvatar] = useState("");
  const [open, setOpen] = React.useState(false);
  const [genre, setGenre] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useContext(AuthContext);
  const documentId = nanoid();

  const handleSubmit = (e) => {
    e.preventDefault();
    const DateRef = "DatePlan";
    const ARef = doc(db, DateRef, documentId);
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
            setDoc(ARef, {
              user: user.displayName,
              userid: user.uid,
              title: title,
              img: url,
              addresses: addresses,
              genre: genre,
              // route: route,
              description: description,
              timeStamp: serverTimestamp(),
              id: documentId,
            });
          });
        }
      );
    }
    setTitle("");
    setImg("");
    setAddressees([
      { location: { lat: null, lng: null }, name: "", id: "" },
      { location: { lat: null, lng: null }, name: "", id: "" },
      { location: { lat: null, lng: null }, name: "", id: "" },
    ]);
    setGenre([]);
    // setRoute("");
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
  const postButtonStyle = {
    padding: "10px 30px",
    backgroundColor: "#ff00ff",
    color: "#fff",
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

  const setAddress = (index) => (address) => {
    let newAddresses = [...addresses];
    newAddresses[index] = address;
    setAddressees(newAddresses);
  };

  return (
    <div>
      <div className="text-2xl">
        <Button sx={postButtonStyle} onClick={handleOpen}>
          投稿
        </Button>
      </div>
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
              <DateGenre genre={genre} setGenre={setGenre} />
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
            {addresses.map((address, index) => {
              return (
                <div key={index}>
                  <SearchAndMap1
                    label={`デートスポット${index + 1}`}
                    setAddress={setAddress(index)}
                    address={address}
                    id={index}
                  />
                  {/* <div className="my-5">
                    <PostTextField
                      id={"time"}
                      label={`${index + 1}から${index + 2}の時間`}
                      type={"time"}
                      defaultValue={"00:00"}
                      width={"13vh"}
                      onChange={(e) => setRoute(e.target.value)}
                    />
                  </div> */}
                </div>
              );
            })}
            <div className="my-5">
              <PostTextField
                id={"outlined-multiline-static"}
                label={"デート詳細"}
                placeholder={CommentPlaceholder}
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
