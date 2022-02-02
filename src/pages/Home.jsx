//components
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import { db, auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { query, onSnapshot, collection, orderBy } from "firebase/firestore";
import { Post } from "./templates/post";
import { Link } from "react-router-dom";
import { DateCard } from "../pages/molequres/DateCard";

export const Home = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "DatePlan"), orderBy("timeStamp", "desc"));
    onSnapshot(q, (snapshot) => {
      const plans = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setPlans(plans);
    });
  }, []);

  const user = useContext(AuthContext);

  return (
    <>
      <h1>Home</h1>
      <Post />
      <ul className="mx-auto">
        {plans.map((plan) => {
          return <DateCard  plan={plan} />;
        })}
      </ul>
      <button onClick={() => signOut(auth)}>ログアウト</button>
      <Link to="/profile">Profile</Link>
    </>
  );
};
