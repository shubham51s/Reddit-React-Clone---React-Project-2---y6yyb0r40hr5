import React, { useContext, useState } from "react";
import style from "./joinbutton.module.css";
import UserContext from "@/app/contexts/LoginContext";

function JoinBtnComp({ item }) {
  const { isLoggedIn, setUserLoginModal } = useContext(UserContext);
  const [isJoined, setIsJoined] = useState(false);

  const followUser = async (id, token) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/quora/follow/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const unfollowUser = async (id, token) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/quora/follow/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleJoinBtn = () => {
    if (!isLoggedIn) {
      setUserLoginModal(true);
    } else {
      setIsJoined(!isJoined);
      if (isJoined) {
        unfollowUser(item._id, localStorage.getItem("authToken"));
      } else {
        followUser(item._id, localStorage.getItem("authToken"));
      }
    }
  };

  return (
    <div className={style.joinBtnMain}>
      <button className={style.joinBtn} onClick={handleJoinBtn}>
        {`${isJoined ? "Joined" : "Join"}`}
      </button>
    </div>
  );
}

export default JoinBtnComp;
