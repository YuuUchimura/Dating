import { useState } from "react";
import { db } from "../config/firebase";
import {
  doc,
  deleteDoc,
  query,
  onSnapshot,
  collection,
  where,
  getDoc
} from "firebase/firestore";

//ログインユーザーの地図の表示をいじる
export const useFetchMyPostAddress = () => {
  const [myAddress, setMyAddress] = useState([]);

  const fetchMyDateAddress = async ({ id }) => {
    const DateRef = "DatePlan";
    const DRef = query(collection(db, DateRef), where("userid", "==", id));
    const q = query(DRef);
    try {
      onSnapshot(q, (snapshot) => {
        setMyAddress(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (e) {
      console.log(e);
    }
  };
  
  const deletePost = async (deleteId) => {
    await deleteDoc(doc(db, "DatePlan", `${deleteId}`));
  };

  return {
    fetchMyDateAddress,
    myAddress,
    deletePost,
  };
};
