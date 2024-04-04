import React, { useContext, useState } from "react";
import style from "./joinbutton.module.css";
import UserContext from "@/app/contexts/LoginContext";

function JoinBtnComp() {
  const { isLoggedIn, setUserLoginModal } = useContext(UserContext);
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinBtn = () => {
    if (!isLoggedIn) {
      setUserLoginModal(true);
    } else setIsJoined(!isJoined);
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
