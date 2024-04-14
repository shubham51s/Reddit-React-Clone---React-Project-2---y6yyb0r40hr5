import React, { useContext, useState } from "react";
import style from "./commentsvote.module.css";
import { TheaterComedy } from "@mui/icons-material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useScrollTrigger } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ThemeContext from "@/app/contexts/ThemeContext";
import UserContext from "@/app/contexts/LoginContext";

function CommentsComp({ upvote, comments, item }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const {
    isLoggedIn,
    setUserLoginModal,
    setShowComments,
    setPostItem,
    myProjectId,
  } = useContext(UserContext);

  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  const makeUpvote = async (id, token) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/like/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );

      const result = await resp.json();
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const makeDownVote = async (id, token) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/like/:${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );

      const result = await resp.json();
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setUserLoginModal(true);
    } else if (!upVote) {
      setUpVote(true);
      setDownVote(false);
      makeUpvote(item._id, localStorage.getItem("authToken"));
    }
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    if (!isLoggedIn) {
      setUserLoginModal(true);
    } else if (!downVote) {
      setDownVote(true);
      setUpVote(false);
      makeDownVote(item._id, localStorage.getItem("authToken"));
    }
  };

  const handleComments = (e) => {
    e.stopPropagation();
    setPostItem(item);
    sessionStorage.setItem("postId", item._id);
    if (item.channel) {
      sessionStorage.setItem("userChannelId", item.channel._id);
    }
    setShowComments(true);
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
            <span className={style.voteCount}>{upvote}</span>
          )}
          {upVote && !downVote && (
            <span className={style.voteCount}>{`${upvote + 1}`}</span>
          )}
          {!upVote && downVote && (
            <span className={style.voteCount}>{`${upvote - 1}`}</span>
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
        <span className={style.commentCtr} onClick={(e) => handleComments(e)}>
          <span className={style.commentIconMain}>
            <ModeCommentOutlinedIcon style={{ fontSize: "20px" }} />
          </span>
          {/* need to add comments later */}
          <span className={style.commentValue}>{comments}</span>
        </span>
      </span>
    </div>
  );
}

export default CommentsComp;
