import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthService";
import { signOut } from "firebase/auth";
import { auth, db } from "../config/firebase";
import { EditProfile } from "./templates/EditProfile";
import { query, onSnapshot, collection } from "firebase/firestore";

export const Profile = () => {
  const [currentUsers, setCurrentUsers] = useState([]);
  const user = useContext(AuthContext);
  useEffect(() => {
    const q = query(collection(db, "user"));
    onSnapshot(q, (snapshot) => {
      const currentUsers = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setCurrentUsers(currentUsers);
    });
  }, []);

  return (
    <div className="w-10/12 mx-auto">
      <header className="h-12 flex justify-between">
        <div>ロゴ</div>
        {/* <img src="" alt="" /> */}
        <div>
          <button onClick={() => signOut(auth)}>ログアウト</button>
        </div>
      </header>
      <main>
        {currentUsers.map((currentUser) => {
          <div className="h-48 flex items-center justify-between">
            <div>
              <div>
                {currentUser.name}
                {console.log(currentUser.name)}
                {/* <img src="" alt="" /> */}
              </div>
              {/* <div>{user.displayName}</div> */}
            </div>
            <div className="leading-8">
              <EditProfile />
              <div>
                <span>投稿数●件</span>
                <span>フォロー数●人</span>
                <span>フォロワー数●人</span>
              </div>
              <div>
                <h3>自己紹介</h3>
                <div>本文</div>
              </div>
            </div>
          </div>;
        })}
        <div className="flex justify-around">
          <span>投稿</span>
          <span>Dateしたい</span>
        </div>
      </main>
    </div>
  );
};
