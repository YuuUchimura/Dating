// import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import { Home } from "./pages/Home";

import { AuthProvider } from "./AuthService";
import { LoggedInRoute } from "./LoggedInRoute";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <LoggedInRoute exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
