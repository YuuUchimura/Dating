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
// import { LoginUserCard } from "./Organisms/LoginUserCard";
import { LogoutButton } from "./atoms/Logout";
import Avatar from "@mui/material/Avatar";
import { Reference } from "./atoms/Reference";
import love from "../images/love.png";
export const Home = () => {
  const user = useContext(AuthContext);
  const [choiceValues, setChoiceValues] = useState([]);
  const [choice, setChoice] = useState(true);
  const { fetchPostUser, fetchLoginUser, loginUser } = useFetchUser({
    user,
  });
  const { fetchDatePlan, posts } = useFetchDatePlan();

  useEffect(() => {
    const fetchData = async () => {
      await fetchPostUser();
      await fetchLoginUser();
      const unSub = fetchDatePlan();
      return unSub;
    };
    const unSub = fetchData();
    return unSub
  }, []);

  return (
    <div className="font-Comic">
      <div className="bg-header-bg bg-cover shadow-lg">
        <header className="w-10/12 md:w-9/12 h-28 md:h-36 flex items-center justify-between mx-auto">
          <Link to="/">
            <img width={300} src={Dating} alt="DatingIcon" />
          </Link>
          <div className="flex">
            <LogoutButton />
            <Link to={`/profile/${user.uid}`}>
              <Avatar src={loginUser[0]?.img}></Avatar>
            </Link>
          </div>
        </header>
      </div>
      <Container>
        <div className="flex flex-col w-10/12 mx-auto">
          {/* <LoginUserCard /> */}
          <Search
            choice={choice}
            setChoice={setChoice}
            setChoiceValues={setChoiceValues}
          />
          <Reference />
          <img
            className="invisible lg:visible h-64 w-64 fixed bottom-28 right-20"
            src={love}
            alt="icon"
          />
        </div>
        <h1 className="w-11/12 lg:w-8/12 my-5 mx-auto lg:mx-0 text-xl md:text-4xl">
          みんなの最高のデートプラン
        </h1>
        <div className="w-11/12 mx-auto lg:flex lg:w-8/12 lg:mx-0">
          <div>
            {choice ? (
              <div className="md:flex flex-wrap mx-auto">
                {posts.map((post, i) => {
                  return <DateCard user={user} key={post.id} post={post} />;
                })}
              </div>
            ) : (
              <div className="md:flex flex-wrap mx-auto">
                {choiceValues.map((choiceValue, i) => {
                  return (
                    <ChoiceDateCard
                      user={user}
                      key={i}
                      choiceValue={choiceValue}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        <div className="fixed bottom-10 right-24 w-1/6 lg:w-1/4">
          <Post />
        </div>
      </Container>
    </div>
  );
};
