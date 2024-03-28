import React, { useState } from "react";
import style from "./joinbutton.module.css";

function JoinBtnComp() {
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinBtn = () => {
    setIsJoined(!isJoined);
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
