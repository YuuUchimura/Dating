// lib
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import firebase from "../config/firebase";

// @material-ui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// components
import background from "../images/background.jpeg";

export const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <SContainer>
      <Box
        sx={{
          paddingTop: 100,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          パスワードの再設定
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
            label="E-mail"
            name="e-mail"
            autoComplete="e-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <br />
          <Button type="submit" variant="contained" color="secondary">
            送信
          </Button>
        </Box>
        <Link to="/login">ログイン画面へ</Link>
      </Box>
    </SContainer>
  );
};
const SContainer = styled.div`
  background-image: url(${background});
  max-width: 100vw;
  background-size: cover;
  background-repeat: no-repeat;
  height: 100vh;
`;
