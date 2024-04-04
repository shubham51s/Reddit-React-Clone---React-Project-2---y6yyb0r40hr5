"use client";
import React, { useContext } from "react";
import style from "./commentscomp.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Translate } from "@mui/icons-material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CommentsComp from "../homeRightComp/voteNcomments";

function ShowCommentsComp() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={style.mainContainer}>
      <div className={style.mainContent}>
        <main className={style.leftContainer}>
          <div
            className={style.postContainer}
            style={{ backgroundColor: theme.bgColor }}
          >
            <div className={style.creditBar}>
              <span className={style.creditBarMain}>
                <div className={style.leftArrowMain}>
                  <button
                    className={style.leftArrowBtn}
                    style={{
                      color: theme.activeNavClr,
                      backgroundColor: theme.activeNavBg,
                    }}
                  >
                    <span className={style.arrowBtnCtr}>
                      <span className={style.flex}>
                        <ArrowBackOutlinedIcon />
                      </span>
                    </span>
                  </button>
                </div>
                <span className={style.profileImgMain}>
                  <span
                    className={style.profileLink}
                    style={{ color: theme.navTabColor }}
                  >
                    <div className={style.profileContent}>
                      <div className={style.profileContentInner}>
                        <div className={style.loaded}>
                          <img
                            className={style.profileImg}
                            // need to add profile image later
                            src={`https://styles.redditmedia.com/t5_2qp7h/styles/communityIcon_99plnf3ouwrc1.png`}
                            alt={`profile image`}
                          />
                        </div>
                      </div>
                    </div>
                  </span>
                </span>
                <div className={style.aboutProfileMain}>
                  <span className={style.communityNameMain}>
                    <span className={style.commNameMain}>
                      <span
                        className={style.communityLink}
                        style={{ color: theme.communityTxtClr }}
                      >
                        {/* need to add community name later */}
                        {`r/indiasocial`}
                      </span>
                    </span>
                    <span
                      className={style.dot}
                      style={{ color: theme.popularCommunitiesTxt }}
                    >
                      •
                    </span>
                    <div
                      className={style.timeContainer}
                      style={{ color: theme.popularCommunitiesTxt }}
                    >
                      {/* need to add time later */}
                      {`10 hr. ago`}
                    </div>
                  </span>
                  <div className={style.communityAbout}></div>
                </div>
              </span>
              <span></span>
            </div>
            <h1
              className={style.mainHeadingContainer}
              style={{ color: theme.navTabColor }}
            >
              {/* need to add comment later */}
              {` Do you guys know about this flower?`}
            </h1>
            <div
              className={style.postImgContainer}
              style={{ backgroundColor: theme.bgColor }}
            >
              <div
                className={style.postImg}
                style={{ borderColor: theme.sortBtmBorderClr }}
              ></div>
              <div>
                <div>
                  {/* need to arrow buttons later */}
                  {/* <div className={style.imgArrowMain}>
                    <div className={style.arrowContainer}>
                      <span className={style.prevBtn}>
                        <button className={style.prevButton}>
                          <span className={style.arrowBtnCtr}>
                            <span className={style.flex}>
                              <ArrowBackIosNewOutlinedIcon
                                style={{ fontSize: "18px" }}
                              />
                            </span>
                          </span>
                        </button>
                      </span>
                      <span className={style.nextBtn}>
                        <button className={style.nextButton}>
                          <span className={style.nextBtnCtr}>
                            <span className={style.flex}>
                              <ArrowForwardIosOutlinedIcon
                                style={{ fontSize: "18px" }}
                              />
                            </span>
                          </span>
                        </button>
                      </span>
                    </div>
                  </div> */}
                  <ul
                    className={style.postMediaMain}
                    // need to add translate later
                    style={{ transform: `translate3d(${0}px, 0px, 0px)` }}
                  >
                    <li
                      className={style.postMediaList}
                      style={{ backgroundColor: "rgba(0, 0, 0, .2)" }}
                    >
                      <img
                        className={style.backImg}
                        src={`https://picsum.photos/seed/X0ChsZH/640/480`}
                        alt={`post image`}
                      />
                      <div className={style.imgListMain}>
                        <img
                          className={style.postMedia}
                          src={`https://picsum.photos/seed/X0ChsZH/640/480`}
                          alt={`post image`}
                        />
                      </div>
                    </li>
                    {/* <li
                      className={style.postMediaList}
                      style={{ backgroundColor: "rgba(0, 0, 0, .2)" }}
                    >
                      <img
                        className={style.backImg}
                        src={`https://picsum.photos/seed/bnml91b/640/480`}
                        alt={`post image`}
                      />
                      <div className={style.imgListMain}>
                        <img
                          className={style.postMedia}
                          src={`https://picsum.photos/seed/bnml91b/640/480`}
                          alt={`post image`}
                        />
                      </div>
                    </li> */}
                  </ul>
                </div>
              </div>
            </div>{" "}
            <div className={style.voteContainer}>
              <CommentsComp />
            </div>
          </div>
          <div
            className={style.addCommentContainer}
            style={{ color: theme.commentClr, backgroundColor: theme.bgColor }}
          >
            {/* if required need to extra div as parent for comment container  */}
          </div>
          <div className={style.commentTreeContainer}></div>
        </main>
        <div className={style.rightContainer}></div>
      </div>
    </div>
  );
}

export default ShowCommentsComp;
