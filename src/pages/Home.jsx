//components
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import { db, auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { query, onSnapshot, collection, orderBy } from "firebase/firestore";
import { Post } from "./templates/post";
import { Link } from "react-router-dom";
import { DateCard } from "../pages/Organisms/DateCard";
import { SqueezeDateCard } from "../pages/Organisms/SqueezeDateCard";
import { Search } from "./molequres/Search";
import Button from "@mui/material/Button";
import { Container } from "./atoms/Container";
import Dating from "../images/Dating-logo.png";
import { LogoutButton } from "./atoms/Logout";

export const Home = () => {
  const [plans, setPlans] = useState([]);
  const [values, setValues] = useState([]);
  const [squeeze, setSqueeze] = useState(true);

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
      <Container>
        <div className="">
          <header className="w-9/12 h-24 flex items-center justify-between mx-auto">
            <div>
              <img width={150} src={Dating} alt="" />
            </div>
            <div className="flex">
              <Search
                squeeze={squeeze}
                setSqueeze={setSqueeze}
                values={values}
                setValues={setValues}
              />
              <LogoutButton />
            </div>
          </header>
        </div>
        <div className="fixed bottom-10 right-10">
          <Post />
        </div>
        <div className="w-9/12 mx-auto">
          <div className="flex">
            <div>
              <Link to={`/profile/${user.displayName}`}>Profile</Link>
              {squeeze ? (
                <ul className="mx-auto">
                  {plans.map((plan, i) => {
                    return <DateCard key={i} id={i} plan={plan} />;
                  })}
                </ul>
              ) : (
                <ul className="mx-auto">
                  {values.map((value, i) => {
                    return <SqueezeDateCard key={i} id={i} value={value} />;
                  })}
                </ul>
              )}
            </div>
            <div className="fixed top-15 right-0 h-96 w-1/4 bg-red-500">
              {/* ミニプロフィール */}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
