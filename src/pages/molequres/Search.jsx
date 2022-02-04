import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthService";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { DateGenres } from "../atoms/DateGenre";
import { DateGenreImages } from "../atoms/DateGenre";
import { auth, db } from "../../config/firebase";
import { query, onSnapshot, collection, where } from "firebase/firestore";

export const Search = () => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("aaa");
  const [searchValue, setSearchValue] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useContext(AuthContext);

  const style = {
    margin: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    height: "80vh",
    overflow: "scroll",
    width: "80vw",
  };

  const Searching = (e) => {
    const v = e.target.alt;
    const q = query(collection(db, "DatePlan"), where("genre", "==", `${v}`));
    const unSub = onSnapshot(q, (snapshot) => {
      setValue(snapshot.docs.map((doc) => doc.data().title));
    });
    return () => {
      unSub();
    };
  };
  const s = (e) => {
    console.log(e.target.alt);
  };

  return (
    <>
      <div className="w-24 h-24">{value}</div>
      <Button onClick={handleOpen}>
        <SearchIcon />
      </Button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <h1 className="my-10 text-2xl">デートジャンル</h1>
            <div className="flex flex-wrap  my-5 content-center justify-center">
              {DateGenreImages.map((image, index) => {
                return (
                  <div className="flex flex-col rounded-md my-5 w-80 mx-auto justify- bg-pink-100">
                    <button onClick={Searching}>{image}</button>
                    {DateGenres[index]}
                  </div>
                );
              })}
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
