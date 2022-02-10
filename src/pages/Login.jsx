import React, { useState, useContext } from "react";
import { Redirect, Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../AuthService";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export const Login = ({ history }) => {
  const user = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        history.push("/");
      })
      .catch((err) => {
        console.log(err);
        alert("メールアドレスまたはパスワードが間違っています。");
      });
  };

  if (user) {
    return <Redirect to="/" />;
  }
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
            ログイン
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
              autoFocus
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
              label="Password"
              name="password"
              autoComplete="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <br />
            <Button
              type="submit"
              fullwidth="true"
              variant="contained"
              color="secondary"
            >
              ログイン
            </Button>
          </Box>
        <Link to="/signup">新規登録</Link>
      </Box>
    </>
  );
};
