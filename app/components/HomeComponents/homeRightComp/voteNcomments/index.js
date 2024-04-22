import React, { useContext, useState } from "react";
import style from "./commentsvote.module.css";
import { TheaterComedy } from "@mui/icons-material";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ThumbDownOutlinedIcon from "@mui/icons-material/ThumbDownOutlined";
import { useScrollTrigger } from "@mui/material";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ThemeContext from "@/app/contexts/ThemeContext";
import UserContext from "@/app/contexts/LoginContext";

function CommentsComp({
  upvote,
  comments,
  item,
  setPostResult,
  isLiked,
  isDisliked,
  sortValue,
  postResult,
}) {
  const { theme, setTheme } = useContext(ThemeContext);
  const {
    isLoggedIn,
    setUserLoginModal,
    setShowComments,
    setPostItem,
    myProjectId,
    showComments,
    isPopular,
  } = useContext(UserContext);

  const [upVote, setUpVote] = useState(false);
  const [downVote, setDownVote] = useState(false);

  const fetchPosts = async (token) => {
    try {
      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/post?limit=100",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      if (isPopular) {
        const sortedData = result.data.sort(
          (a, b) => b.likeCount - a.likeCount
        );
        setPostResult(sortedData);
      } else {
        setPostResult(result.data);
      }
      if (sortValue != 1) {
        if (val == 2) {
          postResult.sort((a, b) => b.dislikeCount - a.dislikeCount);
        } else if (val == 3) {
          postResult.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        } else if (val == 4) {
          postResult.sort((a, b) => b.likeCount - a.likeCount);
        }
      }
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

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
      fetchPosts(token);
      setDownVote(false);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const makeDownVote = async (id, token) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/like/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );

      const result = await resp.json();
      fetchPosts(token);
      setDownVote(true);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleUpvote = (e) => {
    e.stopPropagation();
    if (!showComments) {
      if (!isLoggedIn) {
        setUserLoginModal(true);
      } else if (!isLiked) {
        setUpVote(true);
        setDownVote(false);
        makeUpvote(item._id, localStorage.getItem("authToken"));
      }
    }
  };

  const handleDownVote = (e) => {
    e.stopPropagation();
    if (!showComments) {
      if (!isLoggedIn) {
        setUserLoginModal(true);
      } else if (isLiked) {
        makeDownVote(item._id, localStorage.getItem("authToken"));
      } else {
        setDownVote(true);
      }
    }
  };

  const handleComments = (e) => {
    e.stopPropagation();
    if (!showComments) {
      setPostItem(item);

      sessionStorage.setItem("postId", item._id);
      if (item.channel) {
        sessionStorage.setItem("userChannelId", item.channel._id);
      }
      setShowComments(true);
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
              {isLiked && (
                <ThumbUpOutlinedIcon style={{ color: "orangered" }} />
              )}
              {!isLiked && <ThumbUpOutlinedIcon />}
            </span>
          </button>

          <span className={style.voteCount}>{upvote}</span>
          <button
            className={style.voteBtn}
            style={{ color: theme.navTabColor, background: "transparent" }}
          >
            <span className={style.downvoteBtnInner}>
              {isDisliked && (
                <ThumbDownOutlinedIcon style={{ color: "blue" }} />
              )}

              {!isDisliked && (
                <ThumbDownOutlinedIcon
                  style={{ color: downVote ? "blue" : "" }}
                  onClick={(e) => handleDownVote(e)}
                />
              )}
              {/* <ThumbDownOutlinedIcon
                style={{ color: downVote ? "blue" : "" }}
              /> */}
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
