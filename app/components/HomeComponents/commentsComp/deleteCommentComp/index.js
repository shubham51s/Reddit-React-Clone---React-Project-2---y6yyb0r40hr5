"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./deletecommentcomp.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

function DeleteCommentComp({ commentId, fetchComments }) {
  const { theme } = useContext(ThemeContext);
  const [showContent, setShowContent] = useState(false);
  const menuRef = useRef(null);
  const contentRef = useRef(null);

  const deleteUserComment = async (id, token, postId) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/comment/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );

      fetchComments(postId, token);
      setShowContent(false);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleDeletePostClick = (e) => {
    e.stopPropagation();
    deleteUserComment(
      commentId,
      localStorage.getItem("authToken"),
      sessionStorage.getItem("postId")
    );
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        contentRef.current &&
        !contentRef.current.contains(e.target)
      ) {
        setShowContent(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={style.mainContainer}>
      <div className={style.mainContainerInner}>
        <button
          className={style.menuBtn}
          onClick={() => setShowContent(!showContent)}
          ref={menuRef}
        >
          <span className={style.btnCenter}>
            <span className={style.flex} style={{ cursor: "pointer" }}>
              <MoreHorizOutlinedIcon
                style={{ color: theme.popularCommunitiesTxt }}
              />
            </span>
          </span>
        </button>
        {/* below is onclick content */}
        {showContent && (
          <div
            className={style.moreContent}
            style={{ backgroundColor: theme.createCommunityBg }}
            ref={contentRef}
          >
            <li
              className={style.listItem}
              style={{ borderColor: theme.borderColor }}
              onClick={(e) => handleDeletePostClick(e)}
            >
              <div
                className={style.listItemMain}
                style={{ color: theme.navTabColor }}
              >
                <span className={style.listContent}>
                  <span className={style.iconMain}>
                    <DeleteOutlineOutlinedIcon />
                  </span>
                  <span className={style.listContentMain}>
                    <span className={style.text14}>Delete Comment</span>
                    <span></span>
                  </span>
                </span>
                <span></span>
              </div>
            </li>
          </div>
        )}
      </div>
    </div>
  );
}

export default DeleteCommentComp;
