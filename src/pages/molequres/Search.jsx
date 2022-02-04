import React, { useState, useContext } from "react";
import { AuthContext } from "../../AuthService";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import SearchIcon from "@mui/icons-material/Search";
import { DateGenres } from "../atoms/DateGenre";
import { DateGenreImages } from "../atoms/DateGenre";
export const Search = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const user = useContext(AuthContext);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const buttonStyle = {
  //     backgroundColor: "#ff00ff",
  //     "&:hover": {
  //       backgroundColor: "#ff00ff",
  //       opacity: 0.8,
  //     },

  const style = {
    // display: "flex",
    // flexDirection: "column",
    // justifyContent: "cetnter",
    // alignItems: "center",
    margin: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    height: "80vh",
    overflow: "scroll",
    width: "80vw",
  };
  // console.log(DateGenreImages)
  return (
    <>
      <div className="w-24 h-24">
      </div>
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
            <div className="flex flex-wrap my-5 content-center justify-center">
              {DateGenres.map((dategenre, index) => {
                return (
                  <>
                    <div className="m-5 h-72 w-72">
                      <div className="flex h-72 w-72 mx-auto justify-center items-center bg-red-500">
                        画像
                      </div>
                      <h5 className="flex justify-center items-center">
                        {dategenre}
                      </h5>
                    </div>
                  </>
                );
              })}
            </div>
          </Box>
        </Modal>
      </div>
    </>
  );
};
