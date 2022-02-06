// lib
import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
// import styled from "styled-components";
import { auth } from "../config/firebase";
import { sendSignInLinkToEmail } from "firebase/auth";

// @material-ui
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

// components
// import background from "../images/background.jpeg";
import { AuthContext } from "../AuthService";

export const SignInCheck = () => {
  const [email, setEmail] = useState("");

  const user = useContext(AuthContext);

  if (user) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    const actionCodeSettings = {
      url: `${window.location.origin}/signup`,
      handleCodeInApp: true,
    };
    e.preventDefault();
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        console.log("succes");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
  };

  return (
    // <SContainer>
    <Box
      sx={{
        paddingTop: 100,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography component="h1" variant="h5">
        メールを送る
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
          メールを送る
        </Button>
      </Box>
      <Link to="/login">ログイン画面へ</Link>
    </Box>
  );
  /* </SContainer> */
};
// };
// const SContainer = styled.div`
//   background-image: url(${background});
//   max-width: 100vw;
//   background-size: cover;
//   background-repeat: no-repeat;
//   height: 100vh;
// `;
