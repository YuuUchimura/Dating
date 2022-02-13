import { useState } from "react";
import { db } from "../config/firebase";
import {
  query,
  onSnapshot,
  collection,
  where,
  getDoc,
} from "firebase/firestore";

//ログインユーザーの情報を取得する
export const useFetchUser = ({ user }) => {
  //すべてのユーザーが入っている
  const [datingUser, setDatingUser] = useState([]);
  //loginUserにはログインしているユーザーの情報が入っている
  const [loginUser, setLoginUser] = useState([]);
  //各投稿のユーザー情報が入っている
  const [postUser, setPostUser] = useState([]);

  //現在ログインしているユーザーを取得している
  const fetchDatingUser = async () => {
    const q = query(collection(db, "user"));
    try {
      onSnapshot(q, (snapshot) => {
        setDatingUser(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchPostUser = async ({ user }) => {
    const DRef = query(collection(db, "user"), where("userid", "==", "userid"));
    const q = query(DRef);
    try {
      onSnapshot(q, (snapshot) => {
        setPostUser(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (e) {
      console.log(e);
    }
  };

  const fetchLoginUser = async () => {
    const q = query(collection(db, "user"), where("userid", "==", user.uid));
    try {
      onSnapshot(q, (snapshot) => {
        setLoginUser(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (e) {
      console.log(e);
    }
  };



  return {
    datingUser,
    fetchDatingUser,
    postUser,
    fetchPostUser,
    loginUser,
    fetchLoginUser,
  };
};
