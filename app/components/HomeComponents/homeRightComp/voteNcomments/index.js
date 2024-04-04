import React, { useContext, useState } from "react";
import style from "./commentsvote.module.css";
import { TheaterComedy } from "@mui/icons-material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useScrollTrigger } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ThemeContext from "@/app/contexts/ThemeContext";

function CommentsComp({ likeCount, commentCount }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (!upVote) {
      setUpVote(true);
      setDownVote(false);
    }
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    if (!downVote) {
      setDownVote(true);
      setUpVote(false);
    }
  };

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
            <span
              className={style.upvoteBtnInner}
              onClick={(e) => handleUpvote(e)}
            >
              <ThumbUpOutlinedIcon
                style={{ color: upVote ? "orangered" : "" }}
              />
            </span>
          </button>
          {!upVote && !downVote && (
            <span className={style.voteCount}>{likeCount}</span>
          )}{" "}
          {upVote && !downVote && (
            <span className={style.voteCount}>{`${likeCount + 1}`}</span>
          )}{" "}
          {!upVote && downVote && (
            <span className={style.voteCount}>{`${likeCount - 1}`}</span>
          )}
          <button
            className={style.voteBtn}
            style={{ color: theme.navTabColor, background: "transparent" }}
          >
            <span
              className={style.downvoteBtnInner}
              onClick={(e) => handleDownVote(e)}
            >
              <ThumbDownOutlinedIcon
                style={{ color: downVote ? "blue" : "" }}
              />
            </span>
          </button>
        </span>
      </span>
      <span
        className={style.commentsMain}
        style={{ color: theme.activeNavClr, background: theme.activeNavBg }}
      >
        <span className={style.commentCtr}>
          <span className={style.commentIconMain}>
            <ModeCommentOutlinedIcon style={{ fontSize: "20px" }} />
          </span>
          {/* need to add comments later */}
          <span className={style.commentValue}>{commentCount}</span>
        </span>
      </span>
    </div>
  );
}

export default CommentsComp;