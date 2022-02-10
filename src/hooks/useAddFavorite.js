import React, { useState } from "react";
import { setDoc, doc, query } from "firebase/firestore";
import { db } from "../../config/firebase";
export const useFavorite = () => {
  const [favorite, setfavorite] = useState(false);
  const isFavotite = () => {
    setfavorite(!favorite);
    const DateRef = "DatePlan";
    const ARef = doc(db, DateRef);
    setDoc(ARef, {
      favoreite: favorite,
    });
  };
};

return
