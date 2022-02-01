import { onAuthStateChanged } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {auth} from "./config/firebase";
const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // firebase.auth().onAuthStateChanged(setUser);
    onAuthStateChanged(auth,setUser)
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
