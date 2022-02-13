import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getUserIcon = async (userId) => {
  const user = await getDoc(doc(db, `user/${userId}`));
  return user.data().img;
};
