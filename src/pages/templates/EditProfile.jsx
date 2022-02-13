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
  const user = useContext(AuthContext);
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
      <div className="text-sm font-medium cursor-pointer" onClick={handleOpen}>
        プロフィール編集
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="mt-36 rounded-md shadow-md flex flex-col justyfy-center items-center mx-auto bg-white border w-2/5 ">
            <h1 className="text-md md:text-2xl my-5">プロフィール編集</h1>
            <form>
              <div className="flex justify-center">
                <Box className="text-left">
                  <IconButton>
                    <label>
                      <input
                        className="flex justify-center hidden"
                        type="file"
                        onChange={onChangeImageHandler}
                      />
                      <div className="flex justify-center">
                        {imageIsSelected ? (
                          <img width={100} src={prevAvatar.toString()} />
                        ) : (
                          <div className="flex justify-center items-center flex-col">
                            <AccountCircleIcon fontSize={"large"} />
                            <p className="text-sm">プロフィール写真の変更</p>
                          </div>
                        )}
                      </div>
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
                className="hover:bg-pink-500 text-lg bg-pink-400 py-3 px-6 text-white"
                variant="contained"
                onClick={handleSubmit}
              >
                編集
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
