import React, { useContext } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Home } from "./pages/Home";
import {Profile} from "./pages/Profile";
import "./styles/global.css"

import { AuthProvider } from "./AuthService";
import { AuthContext } from "./AuthService";
import { LoggedInRoute } from "./LoggedInRoute";

function App() {
  const user = useContext(AuthContext);
  return (
    <AuthProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <LoggedInRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact
            path="/profile/:id"
            component={Profile}
            user={user}
          />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
