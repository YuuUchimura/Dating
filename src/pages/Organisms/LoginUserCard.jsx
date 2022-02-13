//components
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../AuthService";
import { Link } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";

export const LoginUserCard = () => {
  const user = useContext(AuthContext);
  const { fetchLoginUser, loginUser } = useFetchUser({
    user,
  });

  // const request = async () => {
  //   await fetchLoginUser();
  // };
  useEffect(() => {
    (async () => {
      await fetchLoginUser();
    })();
    // request();
  }, []);

  return (
    <div className="invisible flex flex-col lg:visible lg:py-10 lg:fixed lg:top-80 lg:right-10 lg:w-1/4 rounded-lg bg-white">
      {loginUser?.map((LUser) => {
        return (
          <div>
            <Link to={`/profile/${user.uid}`}>
              <img
                className="mx-auto rounded-full h-0 lg:h-48 lg:w-48"
                src={LUser.img}
                alt="ユーザーアイコン"
              />
              <p className="">プロフィールページへ</p>
            </Link>
            {/* <div className="text-sm mt-1 lg:text-3xl lg:my-5">{LUser.name}</div> */}
          </div>
        );
      })}
    </div>
  );
};
