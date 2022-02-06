import { useState,  } from "react";
import { db } from "../config/firebase";
import {
  query,
  onSnapshot,
  collection,
  where,
} from "firebase/firestore";

export const useFetchMyPostAddress = () => {
  const [myAddress, setMyAddress] = useState([]);

  const fetchMyDateAddress = async ({ id }) => {
    const DateRef = "DatePlan";
    const DRef = query(collection(db, DateRef), where("user", "==", `${id}`));
    const q = query(DRef);
    try {
      onSnapshot(q, (snapshot) => {
        setMyAddress(snapshot.docs.map((doc) => ({ ...doc.data() })));
      });
    } catch (e) {
      console.log(e);
    }
  };

  return {
    fetchMyDateAddress,
    myAddress,
  };
};
