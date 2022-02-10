import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import "./styles/global.css";
import { Page404 } from "./Page404";
import { AuthProvider } from "./AuthService";
import { LoggedInRoute } from "./LoggedInRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <LoggedInRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <LoggedInRoute exact path="/profile/:id" component={Profile} />
          <Route component={Page404} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
