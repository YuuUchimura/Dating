// lib
import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "./AuthService";

export const LoggedInRoute = ({ component: Component, ...rest }) => {
  const user = useContext(AuthContext);

  return (
    <Route
      {...rest}
      component={(routeProps) =>
        user ? <Component {...routeProps} /> : <Redirect to="/login" />
      }
    ></Route>
  );
};
