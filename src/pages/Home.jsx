//components
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import { Post } from "./templates/post";
import { Link } from "react-router-dom";
import { DateCard } from "../pages/Organisms/DateCard";
import { ChoiceDateCard } from "./Organisms/ChoiceDateCard";
import { Search } from "./molequres/Search";
import { Container } from "./atoms/Container";
import Dating from "../images/Dating-logo.png";
import { LogoutButton } from "./atoms/Logout";
import { useFetchUser } from "../hooks/useFetchUser";
import { useFetchDatePlan } from "../hooks/useFetchDatePlan";

export const Home = () => {
  const user = useContext(AuthContext);
  const [choiceValues, setChoiceValues] = useState([]);
  const [choice, setChoice] = useState(true);
  const { fetchDatingUser, fetchPostUser, fetchLoginUser } = useFetchUser({
    user,
  });
  const { fetchDatePlan, posts } = useFetchDatePlan();

  const request = async () => {
    await fetchDatingUser();
    await fetchPostUser({ user });
    await fetchLoginUser();
    await fetchDatePlan();
    
  };
  useEffect(() => {
    request();
  }, []);

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
                choice={choice}
                setChoice={setChoice}
                setChoiceValues={setChoiceValues}
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
              <Link to={`/profile/${user.uid}`}>Profile</Link>
              {choice ? (
                <ul className="mx-auto">
                  {posts.map((post, i) => {
                    return <DateCard user={user} key={i} post={post} />;
                  })}
                </ul>
              ) : (
                <ul className="mx-auto">
                  {choiceValues.map((choiceValue, i) => {
                    return <ChoiceDateCard key={i} choiceValue={choiceValue} />;
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
