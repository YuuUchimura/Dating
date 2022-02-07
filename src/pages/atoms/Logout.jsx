import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";

export const LogoutButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const style = {
    display: "flex",
    justifyContent: "cetnter",
    alignItems: "center",
    flexDirection: "column",
    margin: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    width: "230px",
  };
  return (
    <>
      <Button onClick={handleOpen}>ログアウト</Button>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <div className="flex flex-col">
            <div>ログアウトしますか？</div>
            <div>
              <Button onClick={() => signOut(auth)}>はい</Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};
