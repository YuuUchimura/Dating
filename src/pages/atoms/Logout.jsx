import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { auth } from "../../config/firebase";
import { signOut } from "firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";

export const LogoutButton = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <Button onClick={handleOpen}><LogoutIcon/></Button>
      <Modal open={open} onClose={handleClose}>
        <div className="flex flex-col mx-auto rounded-md shadow-md items-center p-4 w-52 mt-36 bg-white border">
          <div>ログアウトしますか？</div>
          <div>
            <Button onClick={() => signOut(auth)}>はい</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
