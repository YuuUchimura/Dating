import React, { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { DateGenres } from "../atoms/DateGenre";
import { DateGenreImages } from "../atoms/DateGenre";
import { db } from "../../config/firebase";
import { query, onSnapshot, collection, where } from "firebase/firestore";

export const Search = ({ squeeze, setSqueeze,  setValues }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    onSnapshot(q, (snapshot) => {
      const fPlan = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setValues(fPlan);
      setSqueeze(!squeeze);
      handleClose()
    });
  };

  return (
    <>
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
              {DateGenreImages.map((image, i) => {
                return (
                  <div key={i} className="flex flex-col rounded-md my-5 w-80 mx-auto justify- bg-pink-100">
                    <Button onClick={Searching}>{image}</Button>
                    {DateGenres[i]}
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
