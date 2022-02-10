import { useState } from "react";
import { db } from "../config/firebase";
import { query, onSnapshot, collection, orderBy } from "firebase/firestore";

//ログインユーザーの情報を取得する
export const useFetchDatePlan = () => {
  //postsにはすべての投稿が入っている
  const [posts, setPosts] = useState([]);

  //すべての投稿を取得昇順で取得している
  const fetchDatePlan = async () => {
    const q = query(collection(db, "DatePlan"), orderBy("timeStamp", "desc"));
    try {
      onSnapshot(q, (snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    posts,
    fetchDatePlan,
  };
};
