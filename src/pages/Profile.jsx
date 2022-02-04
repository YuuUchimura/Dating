import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { EditProfile } from "./templates/EditProfile";
import {
  query,
  onSnapshot,
  collection,
  where,
} from "firebase/firestore";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [rrr, setRrr] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const user = useContext(AuthContext);

  useEffect(() => {
    const q = query(
      collection(db, "DatePlan"),
      where("genre", "==", "ランチ")
    );
    const unSub = onSnapshot(q, (snapshot) => {
      setRrr(
        snapshot.docs.map(
          (doc) =>
            doc.data().title
        )
      );
    });
    return () => {
      unSub();
    };
  }, []);

  // const a = async () => {
  //   const citiesRef = collection(db, "DatePlan");
  //   const q = query(citiesRef, where("genre", "==", "ランチ"));
  //   const querySnapshot = await getDocs(q);
  //   // console.log(querySnapshot);
  //   querySnapshot.forEach((doc) => {
  //     // console.log(`${doc}`);
  //     console.log("tanaka");
  //     // console.log(`${doc.id}:${doc.data()}`);
  //   });
  // };

  return (
    <div className="w-10/12 mx-auto">
      <div>{rrr}</div>
      <header className="h-12 flex justify-between">
        {/* <button onClick={a}>ぼたん</button> */}
        <div>ロゴ</div>
        {/* <img src="" alt="" /> */}
        <div>
          <button onClick={() => signOut(auth)}>ログアウト</button>
        </div>
      </header>
      <main>
        <EditProfile />
        {currentUsers.map((currentUser) => {
          // console.log(currentUser)
          return (
            <div className="h-48 flex items-center justify-between">
              <div>
                <div>
                  {currentUser.name}
                  {/* {console.log(currentUser.name)} */}
                  {/* <img src="" alt="" /> */}
                </div>
                {/* <div>{user.displayName}</div> */}
              </div>
              <div className="leading-8">
                {/* <div>
                  <span>投稿数●件</span>
                  <span>フォロー数●人</span>
                  <span>フォロワー数●人</span>
                </div> */}
                <div>
                  <h3>自己紹介</h3>
                  <div>本文</div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="flex justify-around my-16 min-w-full border-black border-y">
          <span className="border-black border-x px-5">投稿</span>
          <span className="border-black border-x px-5">Dateしたい</span>
        </div>
      </main>
      <Link to="/">top</Link>
    </div>
  );
};
