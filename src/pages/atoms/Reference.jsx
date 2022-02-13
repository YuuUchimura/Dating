import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Help from "../../images/help.png";

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

export const Reference = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div
        className="text-lg border-4 border-pink-300 rounded-lg py-1 mt-3 lg:py-5 lg:fixed lg:top-96 lg:right-24 lg:w-1/4 w-full bg-white"
        onClick={handleOpen}
      >
        Datingの使い方をチェック！
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img src={Help} alt="ヘルプ" />
        </Box>
      </Modal>
    </>
  );
};
