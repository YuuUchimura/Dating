//components
import React, { useEffect, useContext } from "react";
import { AuthContext } from "../../AuthService";
import { Link } from "react-router-dom";
import { useFetchUser } from "../../hooks/useFetchUser";

import Avatar from "@mui/material/Avatar";

export const LoginUserCard = () => {
  const user = useContext(AuthContext);
  const { fetchLoginUser, loginUser } = useFetchUser({
    user,
  });

  useEffect(() => {
    (async () => {
      await fetchLoginUser();
    })();
  }, []);

  return (
    <div className="invisible flex flex-col h-8 lg:h-96 lg:visible lg:py-5 lg:fixed lg:top-96 lg:right-24 lg:w-1/4 rounded-lg bg-white">
      {loginUser.map((LUser) => {
        return (
          <div>
            <Link to={`/profile/${user.uid}`}>
              <Avatar
                className="rounded-full h-24 w-24 md:h-64 md:w-64 mx-auto"
                src={LUser?.img}
                alt="MyAvater"
              ></Avatar>
            </Link>
            <p className="">プロフィールページへ</p>
            {/* <div className="text-sm mt-1 lg:text-3xl lg:my-5">{LUser.name}</div> */}
          </div>
        );
      })}
    </div>
  );
};
