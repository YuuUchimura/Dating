import React, { useState, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { EditProfile } from "./templates/EditProfile";
import { query, onSnapshot, collection, where } from "firebase/firestore";
import { Link, useParams } from "react-router-dom";
import { Container } from "./atoms/Container";
import Dating from "../images/Dating-logo.png";
import { MyPost } from "./Organisms/MyPost";
import { useFetchMyPost } from "../hooks/useFetchMyPost";
import { useFetchMyPostAddress } from "../hooks/useFetchMyPostAddress";

import Button from "@material-ui/core/Button";

export const Profile = ({ user }) => {
  const { id } = useParams(user);
  const { fetchMyDate, currentPosts, } = useFetchMyPost();
  const {
    fetchMyDateAddress,
    myAddress,
    deletePost,
  } = useFetchMyPostAddress();
  const [currentUsers, setCurrentUsers] = useState([]);
  const request = async () => {
    await fetchMyDate({ id });
    await fetchMyDateAddress({ id });
  };

  useEffect(() => {
    request();
  }, []);

  useEffect(() => {
    const userRef = "user";
    const URef = query(collection(db, userRef), where("user", "==", `${id}`));
    const q = query(URef);
    onSnapshot(q, (snapshot) => {
      const currentUsers = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setCurrentUsers(currentUsers);
    });
  }, [id]);

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
            <Button onClick={() => signOut(auth)}>ログアウト</Button>
          </div>
        </header>
        <main>
          <EditProfile />
          {currentUsers.map((currentUser, i) => {
            return (
              <div key={i} id={i} className="h-72 flex justify-around">
                <div className="flex flex-col justify-around">
                  <div>
                    <img
                      className="rounded-full h-48 w-48"
                      src={currentUser.img}
                      alt="MyAvater"
                    />
                  </div>
                  <span>{currentUser.name}</span>
                </div>
                <div className="flex flex-col justify-around">
                  <div>
                    <div>{currentUser.selfIntroduction}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-around my-16 min-w-full border-black border-y">
            <span className="border-black border-x px-5">投稿</span>
            <span className="border-black border-x px-5">Dateしたい</span>
          </div>
          <MyPost
            myAddress={myAddress}
            currentPosts={currentPosts}
            user={user}
            deletePost={deletePost}
          />
        </main>
      </div>
    </Container>
  );
};
