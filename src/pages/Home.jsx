//components
import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import { Post } from "./templates/Post";
import { Link } from "react-router-dom";
import { DateCard } from "../pages/Organisms/DateCard";
import { ChoiceDateCard } from "./Organisms/ChoiceDateCard";
import { Search } from "./molequres/Search";
import { Container } from "./atoms/Container";
import Dating from "../images/Dating-logo.png";
import { useFetchUser } from "../hooks/useFetchUser";
import { useFetchDatePlan } from "../hooks/useFetchDatePlan";
import { LoginUserCard } from "./Organisms/LoginUserCard";
import { LogoutButton } from "./atoms/Logout";
// import  header_bg  from "../images/header-bg.jpg";

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
    <div className="font-Comic">
      <div className="shadow-lg">
        <header className="w-11/12 md:w-9/12 h-48 flex items-center justify-center md:justify-between mx-auto">
          <Link to="/">
            <img width={300} src={Dating} alt="" />
          </Link>
          <div className="flex">
            <LogoutButton />
          </div>
        </header>
      </div>
      <Container>
        <div className="flex flex-col w-10/12 mx-auto">
          <LoginUserCard />
          <Search
            choice={choice}
            setChoice={setChoice}
            setChoiceValues={setChoiceValues}
          />
        </div>
        {/* <div className=""> */}
        <div className="w-11/12 mx-auto lg:flex lg:w-8/12 lg:mx-0">
          <div>
            {choice ? (
              <ul className="md:flex flex-wrap mx-auto">
                {posts.map((post, i) => {
                  return <DateCard user={user} key={i} post={post} />;
                })}
              </ul>
            ) : (
              <ul className="md:flex flex-wrap mx-auto">
                {choiceValues.map((choiceValue, i) => {
                  return (
                    <ChoiceDateCard
                      user={user}
                      key={i}
                      choiceValue={choiceValue}
                    />
                  );
                })}
              </ul>
            )}
          </div>
        </div>
        <div className="fixed bottom-10 right-10 lg:w-1/4">
          <Post />
        </div>
        {/* </div> */}
      </Container>
    </div>
  );
};
