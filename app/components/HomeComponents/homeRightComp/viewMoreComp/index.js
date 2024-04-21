"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./viewmorecom.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

function ViewMoreOptionComp({ postId, setPostResult }) {
  const { theme } = useContext(ThemeContext);
  const [showContent, setShowContent] = useState(false);
  const menuRef = useRef(null);
  const contentRef = useRef(null);

  const deletePost = async (id, token) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      fetchLoggedInPosts(token);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const fetchLoggedInPosts = async (token) => {
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
      setPostResult(result.data);
      setShowContent(false);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleDeletePostClick = (e) => {
    e.stopPropagation();
    deletePost(postId, localStorage.getItem("authToken"));
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
              <MoreHorizOutlinedIcon style={{ color: theme.navTabColor }} />
            </span>
          </span>
        </button>
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
                    <span className={style.text14}>Delete Post</span>
                    <span></span>
                  </span>
                </span>
                <span></span>
              </div>
            </li>
            {/* <li className={style.listItem}>
              <div
                className={style.listItemMain}
                style={{ color: theme.navTabColor }}
              >
                <span className={style.listContent}>
                  <span className={style.iconMain}>
                    <ModeEditOutlineOutlinedIcon />
                  </span>
                  <span className={style.listContentMain}>
                    <span className={style.text14}>Edit Post</span>
                    <span></span>
                  </span>
                </span>
                <span></span>
              </div>
            </li> */}
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewMoreOptionComp;
