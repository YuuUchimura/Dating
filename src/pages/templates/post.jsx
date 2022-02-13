import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthService";
import { SearchAndMap } from "../molequres/SearchAndMap";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { PostTextField } from "../molequres/PostTextField";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { randomStr } from "../../utils/randomStr";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import { DateGenre } from "../atoms/DateGenre";
import { nanoid } from "nanoid";

const CommentPlaceholder = "デートのおすすめポイントをおしえて！";
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
  const [movePoint, setMovePoint] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useContext(AuthContext);
  const documentId = nanoid();

  const handleSubmit = (e) => {
    e.preventDefault();
    const DateRef = "DatePlan";
    const ARef = doc(db, DateRef, documentId);

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
              movePoint: movePoint,
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
    <div className="font-Comic">
      <div className="text-2xl">
        <Button
          className="font-Skia w-full font-semibold hover:bg-pink-500 text-sm md:text-xl lg:text-2xl bg-pink-400 md:py-10 md:px-5 text-white"
          onClick={handleOpen}
        >
          POST!
        </Button>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="font-Comic overflow-scroll rounded-md shadow-md mt-3 h-3/4 flex flex-col justyfy-center items-center mx-auto bg-white border w-11/12 md:w-2/5 py-10 ">
          <h1 className="mt-5 text-2xl">デートプラン</h1>
          <form>
            <div className="my-5">
              <PostTextField
                label={"デートのタイトル"}
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </div>
            <div className="my-5">
              <DateGenre genre={genre} setGenre={setGenre} />
            </div>
            <label>
              <input
                className="hidden"
                type="file"
                onChange={onChangeImageHandler}
              />
              {imageIsSelected ? (
                <div className="flex justify-center items-center">
                  <img
                    width={200}
                    src={prevAvatar.toString()}
                    alt="PostImage"
                  />
                </div>
              ) : (
                <>
                  <div className="flex justify-center items-center border p-24 text-3xl">
                    <AddPhotoAlternateIcon fontSize="large" />
                  </div>
                </>
              )}
            </label>
            {addresses.map((address, index) => {
              return (
                <div key={index}>
                  <SearchAndMap
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
            <div className="my-5">
              <PostTextField
                label={"移動のポイント（任意）"}
                multiline
                rows={2}
                onChange={(e) => setMovePoint(e.target.value)}
              />
            </div>
          </form>
          <div className="mb-5">
            <Button
              className="font-Skia hover:bg-pink-500 text-lg bg-pink-400 py-3 px-5 text-white"
              variant="contained"
              onClick={handleSubmit}
            >
              POST !
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
