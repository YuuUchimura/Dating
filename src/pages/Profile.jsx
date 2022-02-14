import React, { useState, useEffect, useContext } from "react";
import { db } from "../config/firebase";
import { EditProfile } from "./templates/EditProfile";
import { doc, query, onSnapshot } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Container } from "./atoms/Container";
import Dating from "../images/Dating-logo.png";
import { MyPosts } from "./Organisms/MyPosts";
import { useFetchMyPost } from "../hooks/useFetchMyPost";
import { useFetchMyPostAddress } from "../hooks/useFetchMyPostAddress";
import { LogoutButton } from "../pages/atoms/Logout";
import { AuthContext } from "../AuthService";
import { FavoPostCard } from "./Organisms/FavoPostCard";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Avatar from "@mui/material/Avatar";

export const Profile = () => {
  const user = useContext(AuthContext);
  const { id } = useParams(user);
  const {
    fetchMyDate,
    currentPosts,
    getfavoPosts,
    favoPosts,
  } = useFetchMyPost();
  const { fetchMyDateAddress, myAddress, deletePost } = useFetchMyPostAddress();
  const [currentUser, setCurrentUser] = useState(null);
  const [isMyposts, setIsMyPosts] = useState(true);

  const chageIsMyPosts = (toggle) => {
    setIsMyPosts(toggle);
  };

  const request = async () => {
    const unSub = fetchMyDate({ id });
    await fetchMyDateAddress({ id });
    await getfavoPosts();
    return unSub;
  };

  useEffect(() => {
    if (user) {
      const unSub = request();
      return unSub;
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const userRef = "user";
    const URef = query(doc(db, userRef, id));
    const q = query(URef);
    const unSub = onSnapshot(q, (doc) => {
      setCurrentUser(doc.data());
    });
    return unSub;
  }, [user]);

  return (
    <>
      <div className="font-Skia bg-header-bg bg-cover">
        <header className="w-10/12 md:w-9/12 h-28 md:h-36 flex items-center justify-between mx-auto">
          <div>
            <Link to="/">
              <img width={300} src={Dating} alt="" />
            </Link>
          </div>
          <div>
            <LogoutButton />
          </div>
        </header>
      </div>
      <Container>
        <div className="flex justify-around mx-auto w-10/12">
          <div className="flex flex-col justify-between pt-5">
            <div>
              <Avatar
                className="rounded-full h-24 w-24 md:h-64 md:w-64 mx-auto"
                src={currentUser?.img}
                alt="MyAvater"
              ></Avatar>
              {/* <img
                className="rounded-full h-24 w-24 md:h-64 md:w-64 mx-auto"
                src={currentUser?.img}
                alt="MyAvater"
              /> */}
            </div>
            <span className="md:text-3xl py-5 md:py-10">
              {currentUser?.name}
            </span>
            {user.uid === id ? <EditProfile /> : null}
          </div>
          <div className="border-4 border-pink-300 my-auto pt-5 md:h-3/4 w-3/5 md:py-10 md:w-2/6 flex flex-col justify-around text-xl md:text-2xl lg:text-3xl rounded-lg bg-white">
            <div className="flex justify-around">
              <div>
                <h2 className="font-Skia mb-3">sex</h2>
                <h3 className="text-xl md:text-2xl lg:text-3xl">
                  {currentUser?.sex}
                </h3>
              </div>
              <div>
                <h2 className="font-Skia mb-3 ">age</h2>
                <h3>{currentUser?.age}</h3>
              </div>
              <div>
                <h2 className="font-Skia mb-3">address</h2>
                <h3>{currentUser?.address}</h3>
              </div>
            </div>
            <div className="text-sm md:text-lg lg:text-2xl w-10/12  md:mt-8 mx-auto">
              <div>{currentUser?.selfIntroduction}</div>
            </div>
          </div>
        </div>
        <div className="text-lg md:text-2xl lg:text-3xl my-8  bg-white border-y-4 border-blue-300">
          <div className="w-8/12 flex justify-between mx-auto">
            <span
              className="cursor-pointer py-5 font-Skia "
              onClick={() => {
                chageIsMyPosts(true);
              }}
            >
              My Post
            </span>
            <span
              className="cursor-pointer py-5 font-Skia"
              onClick={() => {
                chageIsMyPosts(false);
              }}
            >
              Date したい!
              <FavoriteIcon sx={{ color: red[500] }} />
            </span>
          </div>
        </div>
        <div className="md:flex flex-wrap">
          {isMyposts ? (
            <MyPosts
              id={id}
              myAddress={myAddress}
              currentPosts={currentPosts}
              user={user}
              deletePost={deletePost}
            />
          ) : (
            <>
              {favoPosts.map((favoPost, i) => {
                return (
                  <FavoPostCard
                    myAddress={myAddress}
                    favoPost={favoPost}
                    user={user}
                    key={i}
                    i={i}
                  />
                );
              })}
            </>
          )}
        </div>
      </Container>
    </>
  );
};
