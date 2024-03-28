import React from "react";
import style from "./commentsvote.module.css";
import { TheaterComedy } from "@mui/icons-material";

function CommentsComp({ theme }) {
  return (
    <div className={style.mainContainer}>
      <span className={style.voteMain}>
        <span
          className={style.voteContent}
          style={{ color: theme.activeNavClr, background: theme.activeNavBg }}
        >
          <button
            className={style.voteBtn}
            style={{ color: theme.navTabColor, background: "transparent" }}
          >
            <span className={style.voteBtnInner}></span>
          </button>
          <span className={style.voteCount}></span>
          <button
            className={style.voteBtn}
            style={{ color: theme.navTabColor, background: "transparent" }}
          >
            <span className={style.voteBtnInner}></span>
          </button>
        </span>
      </span>
      <span
        className={style.commentsMain}
        style={{ color: theme.activeNavClr, background: theme.activeNavBg }}
      ></span>
    </div>
  );
}

export default CommentsComp;
