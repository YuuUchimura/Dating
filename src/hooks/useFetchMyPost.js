import { useState } from "react";
import { db } from "../config/firebase";
import { query, onSnapshot, collection, where } from "firebase/firestore";

export const useFetchMyPost = () => {
  const [currentPosts, setCurrentPosts] = useState([]);

  const fetchMyDate = async ({ id }) => {
    const DateRef = "DatePlan";
    const DRef = query(
      collection(db, DateRef),
      where("user", "==", `${id}`)
    );
    const q = query(DRef);
    try {
      onSnapshot(q, (snapshot) => {
        setCurrentPosts(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    fetchMyDate,
    currentPosts,
  };
};
