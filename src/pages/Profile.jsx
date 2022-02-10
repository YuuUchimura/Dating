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

  const chageIsMyPosts = () => {
    setIsMyPosts(!isMyposts);
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
    <Container>
      <div className="w-10/12 mx-auto">
        <header className="h-24 flex items-center justify-between">
          <div>
            <Link to="/">
              <img width={150} src={Dating} alt="" />
            </Link>
          </div>
          <div>
            <LogoutButton />
          </div>
        </header>
        <main>
          {user.uid === id ? <EditProfile /> : null}
          <div className="h-72 flex justify-around">
            <div className="flex flex-col justify-around">
              <div>
                <img
                  className="rounded-full h-48 w-48"
                  src={currentUser?.img}
                  alt="MyAvater"
                />
              </div>
              <span>{currentUser?.name}</span>
            </div>
            <div className="flex flex-col justify-around">
              <div>
                <div>{currentUser?.selfIntroduction}</div>
              </div>
            </div>
          </div>
          <div className="flex justify-around my-16 min-w-full border-black border-y">
            <span className="border-black border-x px-5">投稿</span>
            <span
              className="border-black border-x px-5"
              onClick={() => {
                chageIsMyPosts();
              }}
            >
              Dateしたい
            </span>
          </div>
          {isMyposts ? (
            <MyPosts
              myAddress={myAddress}
              currentPosts={currentPosts}
              user={user}
              deletePost={deletePost}
            />
          ) : (
            <div>
              {favoPosts.map((favoPost, i) => {
                // console.log(favoPost)
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
            </div>
          )}
        </main>
      </div>
    </Container>
  );
};
