import React, { useState } from "react";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { DateGenres } from "../atoms/DateGenre";
import { DateGenreImages } from "../atoms/DateGenre";
import { db } from "../../config/firebase";
import {
  query,
  onSnapshot,
  collection,
  where,
  orderBy,
} from "firebase/firestore";

export const Search = ({ choice, setChoice, setChoiceValues }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Searching = (e) => {
    const choiceImage = e.target.alt;
    const q = query(
      collection(db, "DatePlan"),
      where("genre", "==", `${choiceImage}`),
      orderBy("timeStamp", "desc")
    );
    onSnapshot(q, (snapshot) => {
      const choiceValues = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setChoiceValues(choiceValues);
      setChoice(!choice);
    });
    handleClose();
  };

  return (
    <>
      <Button
        className="md:text-xl font-semibold lg:fixed lg:top-64 lg:right-24 lg:w-1/4 rounded-lg bg-white"
        onClick={handleOpen}
      >
        <div>
          デートジャンルからさがす
          <SearchIcon fontSize="large" />
        </div>
      </Button>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="md:text-2xl font-semibold overflow-scroll rounded-md h-3/5 shadow-md mt-36 p-5 flex flex-col justyfy-center items-center mx-auto bg-white border w-4/6 ">
            <h1 className="md:my-10">デートジャンル</h1>
            <div className="flex flex-wrap my-5 content-center justify-center">
              {DateGenreImages.map((image, i) => {
                return (
                  <div
                    key={i}
                    className="md:flex md:flex-col font-medium rounded-lg my-5 w-24 md:w-80 mx-auto bg-pink-100"
                  >
                    <Button onClick={Searching}>{image}</Button>
                    {DateGenres[i]}
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
