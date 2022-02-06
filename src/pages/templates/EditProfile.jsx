import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthService";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { PostTextField } from "../../pages/molequres/PostTextField";
import { IconButton } from "@mui/material";
import { randomStr } from "../../utils/randomStr";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../config/firebase";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export const EditProfile = () => {
  const [name, setName] = useState("");
  const [selfIntroduction, setSelfIntroduction] = useState("");
  const [img, setImg] = useState("");
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [imageIsSelected, setImageIsSelected] = useState(false);
  const [prevAvatar, setPrevAvatar] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const UserRef = "user";
    const ARef = doc(db, UserRef, user.uid);

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
            await setDoc(ARef, {
              user: user.displayName,
              userid: user.uid,
              name: name,
              img: url,
              sex: sex,
              age: age,
              address: address,
              selfIntroduction: selfIntroduction,
              timeStamp: serverTimestamp(),
            });
          });
        }
      );
    }
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
    height: "70vh",
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
    <>
      <Button onClick={handleOpen}>プロフィール編集</Button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 className="mt-5 text-2xl">プロフィール編集</h1>
            <form>
              <div>
                <Box className="text-left">
                  <IconButton>
                    <label>
                      <input
                        className="text-center hidden"
                        type="file"
                        onChange={onChangeImageHandler}
                      />
                      <div className="flex justify-center">
                        {imageIsSelected ? (
                          <img width={50} src={prevAvatar.toString()} />
                        ) : (
                          <AccountCircleIcon width={100} fontSize={"large"} />
                        )}
                      </div>
                      <p className="text-sm">プロフィール写真の変更</p>
                    </label>
                  </IconButton>
                </Box>
              </div>
              <div>
                <PostTextField
                  label={"名前"}
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
              <div>
                <PostTextField
                  label={"性別"}
                  onChange={(e) => setSex(e.target.value)}
                  value={sex}
                />
              </div>
              <div>
                <PostTextField
                  label={"年齢"}
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
                />
              </div>
              <div>
                <PostTextField
                  label={"居住地"}
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                />
              </div>
              <div className="my-5">
                <PostTextField
                  id={"outlined-multiline-static"}
                  label={"自己紹介文"}
                  multiline
                  rows={4}
                  onChange={(e) => setSelfIntroduction(e.target.value)}
                />
              </div>
            </form>
            <div className="mb-5">
              <Button
                sx={buttonStyle}
                variant="contained"
                onClick={handleSubmit}
              >
                完了
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
