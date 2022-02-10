import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { AuthContext } from "../AuthService";

export const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const user = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: name,
        });
      })
      .catch((err) => {
        console.log(err);
        alert(
          "登録出来ませんでした。もう一度よく確認してから登録をお願い致します。"
        );
      });
  };

  return (
    <>
      <Box
        sx={{
          paddingTop: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          新規登録
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          sx={{
            display: "flex",
            flexDirection: "column",
            width: 300,
            marginBottom: 15,
          }}
        >
          <TextField
            margin="normal"
            required
            fullwidth="true"
            variant="outlined"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullwidth="true"
            variant="outlined"
            label="E-mail"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <TextField
            type="password"
            margin="normal"
            required
            fullwidth="true"
            variant="outlined"
            label="Password(6文字以上)"
            name="password"
            autoComplete="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <br />
          <Button type="submit" variant="contained" color="secondary">
            登録
          </Button>
        </Box>
        <Link to="/login">ログイン画面へ</Link>
      </Box>
    </>
  );
};
