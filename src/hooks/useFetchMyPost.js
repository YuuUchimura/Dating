import { useState, useContext } from "react";
import { db } from "../config/firebase";
import {
  query,
  onSnapshot,
  collection,
  where,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";

import { AuthContext } from "../AuthService";

//ログインユーザーの情報を取得し、表示する
export const useFetchMyPost = () => {
  const user = useContext(AuthContext);
  const [currentPosts, setCurrentPosts] = useState([]);
  const [favoPosts, setFavoPosts] = useState([]);

  const fetchMyDate = ({ id }) => {
    const DateRef = "DatePlan";
    const DRef = query(collection(db, DateRef), where("userid", "==", `${id}`));
    const q = query(DRef);
    const unSub = onSnapshot(q, (snapshot) => {
      setCurrentPosts(snapshot.docs.map((doc) => ({ ...doc.data() })));
    });
    return unSub;
  };

  const getfavoPosts = async () => {
    const FavoRef = query(collection(db, "user", user.uid, "favoPlans"));
    const docSnap = await getDocs(FavoRef);
    if (docSnap.docs.length > 0) {
      const favoPostIds = docSnap.docs.map((doc) => {
        return { id: doc.id, ...doc.data() };
      });
      const favoPosts = await Promise.all(
        favoPostIds.map(async ({ id }) => {
          const favoPostDoc = await getDoc(doc(db, `DatePlan/${id}`));
          return { ...favoPostDoc.data(), id: id };
        })
      );
      setFavoPosts(favoPosts);
    }
  };

  return {
    fetchMyDate,
    currentPosts,
    getfavoPosts,
    favoPosts,
  };
};
