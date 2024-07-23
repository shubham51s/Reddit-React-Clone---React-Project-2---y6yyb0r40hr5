import React, { useContext, useState } from "react";
import style from "../../homeRightComp/voteNcomments/commentsvote.module.css";
import { TheaterComedy } from "@mui/icons-material";
import { useScrollTrigger } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import UserContext from "@/app/contexts/LoginContext";
import ThemeContext from "@/app/contexts/ThemeContext";
import { BiUpvote } from "react-icons/bi";
import { BiDownvote } from "react-icons/bi";

function CommentsLikeComp({ upvote, item, isLiked, isDisliked }) {
  const {
    isLoggedIn,
    setUserLoginModal,
    setShowComments,
    setPostItem,
    myProjectId,
    showComments,
    isPopular,
  } = useContext(UserContext);

  const [upVote, setUpVote] = useState(isLiked);
  const [alreadyLiked, setAlreadyLiked] = useState(isLiked);
  const [downVote, setDownVote] = useState(false);
  const { theme } = useContext(ThemeContext);

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setUserLoginModal(true);
    } else if (!upVote) {
      setUpVote(true);
      setDownVote(false);
    }
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setUserLoginModal(true);
    } else if (!downVote) {
      setDownVote(true);
      setUpVote(false);
      setAlreadyLiked(false);
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
              <BiUpvote
                style={{ color: upVote ? "orangered" : "", fontSize: "20px" }}
              />
            </span>
          </button>
          {alreadyLiked && <span className={style.voteCount}>{upvote}</span>}
          {!alreadyLiked && (
            <span className={style.voteCount}>
              {upVote ? upvote + 1 : upvote}
            </span>
          )}

          <button
            className={style.voteBtn}
            style={{ color: theme.navTabColor, background: "transparent" }}
            onClick={(e) => handleDownVote(e)}
          >
            <span className={style.downvoteBtnInner}>
              <BiDownvote
                style={{ color: downVote ? "blue" : "", fontSize: "20px" }}
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
        </span>
      </span>
    </div>
  );
}

export default CommentsLikeComp;
