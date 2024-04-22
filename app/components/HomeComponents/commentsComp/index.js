"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./commentscomp.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Translate } from "@mui/icons-material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import CommentsComp from "../homeRightComp/voteNcomments";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import UserContext from "@/app/contexts/LoginContext";
import CommentRightComp from "./commentsRightComp";
import DeleteCommentComp from "./deleteCommentComp";
import DateFormatter from "../homeRightComp/daysFormatDate";

function ShowCommentsComp({ setShowComments, setImgOnly, setImgUrl }) {
  const { theme } = useContext(ThemeContext);
  const { setUserLoginModal, isLoggedIn, postItem } = useContext(UserContext);
  const [postResult, setPostResult] = useState([]);
  const [showUserName, setShowUserName] = useState(false);
  const [commentResults, setCommentResults] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [isAddComment, setIsAddComment] = useState(false);
  const [jwtToken, setJwtToken] = useState(
    localStorage.getItem("authToken") ? localStorage.getItem("authToken") : ""
  );

  const handleAddComment = () => {
    setUserLoginModal(true);
  };

  const fetchComments = async (postId, jwtToken) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post/${postId}/comments`,
        {
          headers: {
            Authorization: jwtToken,
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.json) return;

      const result = await resp.json();
      const sortedComments = result.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setCommentResults(result.data);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const postComment = async (token, input, postId) => {
    try {
      const formData = new URLSearchParams();
      formData.append("content", input);

      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/comment/${postId}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        }
      );

      if (!resp.json) return;
      const result = await resp.json();
      setIsAddComment(false);
      setCommentInput("");
      fetchComments(
        sessionStorage.getItem("postId"),
        localStorage.getItem("authToken")
      );
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleCancelBtn = () => {
    setIsAddComment(false);
    setCommentInput("");
  };

  const handleImageClick = (e, url) => {
    e.stopPropagation;
    setImgUrl(url);
    setImgOnly(true);
  };

  const handleSubmitComment = () => {
    if (commentInput) {
      postComment(
        localStorage.getItem("authToken"),
        commentInput,
        sessionStorage.getItem("postId")
      );
    }
  };

  const handleLeftArrowBtn = () => {
    setShowComments(false);
  };

  const showChannelInfo = (e) => {
    e.stopPropagation();
    setShowUserName(false);
  };

  const showAuthorInfo = (e) => {
    e.stopPropagation();
    setShowUserName(true);
  };

  useEffect(() => {
    if (localStorage.getItem("authToken") && postItem._id) {
      fetchComments(postItem._id, localStorage.getItem("authToken"));
    }
    setJwtToken(
      localStorage.getItem("authToken") ? localStorage.getItem("authToken") : ""
    );
  }, [postItem]);

  return (
    <div className={style.mainContainer}>
      <div className={style.mainContent}>
        <main className={style.leftContainer}>
          {postItem && (
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
                      onClick={handleLeftArrowBtn}
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
                            {postItem.author &&
                              postItem.author.profileImage && (
                                <img
                                  className={style.profileImg}
                                  src={postItem.author.profileImage}
                                  alt={`profile image`}
                                />
                              )}{" "}
                            {postItem.author &&
                              !postItem.author.profileImage && (
                                <span
                                  className={style.nonPrfileUser}
                                  style={{ backgroundColor: theme.activeNavBg }}
                                >
                                  {postItem.author.name[0]}
                                </span>
                              )}
                          </div>
                        </div>
                      </div>
                    </span>
                  </span>
                  <div className={style.aboutProfileMain}>
                    <span className={style.communityNameMain}>
                      <span className={style.commNameMain}>
                        {postItem.channel && postItem.channel.name && (
                          <span
                            className={style.communityLink}
                            style={{ color: theme.communityTxtClr }}
                            onClick={(e) => showChannelInfo(e)}
                          >
                            {postItem.channel.name}
                          </span>
                        )}
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
                        <DateFormatter createdAt={postItem.createdAt} />
                      </div>
                    </span>
                    <div className={style.communityAbout}>
                      <span className={style.authorName}>
                        <div className={style.authorWidthFull}>
                          <div className={style.authorDetail}>
                            <div className={style.postCreditBar}>
                              {postItem.author && postItem.author.name && (
                                <span
                                  className={style.authorNameTxt}
                                  style={{ color: theme.communityTxtClr }}
                                  onClick={(e) => showAuthorInfo(e)}
                                >
                                  {postItem.author.name}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </span>
                      <span></span>
                    </div>
                  </div>
                </span>
                <span></span>
              </div>
              <h1
                className={style.mainHeadingContainer}
                style={{ color: theme.navTabColor }}
              >
                {postItem.content}
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
                    {postItem.images.length >= 1 && (
                      <ul
                        className={style.postMediaMain}
                        style={{ transform: `translate3d(${0}px, 0px, 0px)` }}
                      >
                        <li
                          className={style.postMediaList}
                          style={{ backgroundColor: "rgba(0, 0, 0, .2)" }}
                        >
                          <img
                            className={style.backImg}
                            src={postItem.images[0]}
                            alt={`post image`}
                          />
                          <div className={style.imgListMain}>
                            <img
                              className={style.postMedia}
                              src={postItem.images[0]}
                              alt={`post image`}
                              onClick={(e) =>
                                handleImageClick(e, postItem.images[0])
                              }
                            />
                          </div>
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              </div>
              <div className={style.voteContainer}>
                <CommentsComp
                  upvote={postItem.likeCount}
                  comments={postItem.commentCount}
                  item={postItem}
                  isLiked={postItem.isLiked}
                  isDisliked={postItem.isDisliked}
                  setPostResult={setPostResult}
                />
              </div>
            </div>
          )}

          {!isLoggedIn && (
            <div
              className={style.addCommentContainer}
              style={{
                color: theme.commentClr,
                backgroundColor: theme.bgColor,
              }}
            >
              <div className={style.adduserCommentMain}>
                <button
                  className={style.addCommentBtn}
                  style={{
                    color: theme.navTabColor,
                  }}
                  onClick={handleAddComment}
                >
                  <span className={style.addCmntCtr}>
                    <span className={style.addCommentLogoMain}>
                      <AddOutlinedIcon />
                    </span>
                    <span className={style.addCmntTxt}>Add a Comment</span>
                  </span>
                </button>
              </div>
            </div>
          )}
          {/* when user is logged in */}
          {isLoggedIn && (
            <div
              className={style.loginAddCmntContainer}
              style={{
                color: theme.addCommentClr,
                backgroundColor: theme.addCommentBg,
              }}
            >
              <div>
                {!isAddComment && (
                  <div
                    className={style.initialAdd}
                    style={{ backgroundColor: theme.activeNavBg }}
                  >
                    <button
                      className={style.triggerAddCmntBtn}
                      style={{
                        color: theme.addCmntBtnClr,
                        backgroundColor: theme.activeNavBg,
                        borderColor: theme.borderColor,
                      }}
                      onClick={() => setIsAddComment(true)}
                    >
                      Add a comment
                    </button>
                  </div>
                )}
                {isAddComment && (
                  <div
                    className={style.loginAddCmntMain}
                    style={{ backgroundColor: theme.activeNavBg }}
                  >
                    <div className={style.cmntWidthFull}>
                      <div className={style.addComntInput}>
                        <input
                          className={style.commentInput}
                          style={{ color: theme.activeNavClr }}
                          type="text"
                          value={commentInput}
                          onChange={(e) => setCommentInput(e.target.value)}
                        />
                      </div>
                      <button
                        className={style.cancelBtnMain}
                        style={{ backgroundColor: theme.cancelBtnBg }}
                        onClick={handleCancelBtn}
                      >
                        <span className={style.cancelBtnCtr}>
                          <span className={style.cancelBtnTxt}>Cancel</span>
                        </span>
                      </button>
                      <button
                        className={style.commentSubmitMain}
                        style={{
                          backgroundColor: theme.commentSubBg,
                          color: theme.activeNavClr,
                          opacity: commentInput ? 1 : 0.5,
                        }}
                        onClick={handleSubmitComment}
                      >
                        <span className={style.cancelBtnCtr}>
                          <span className={style.submitCommentInner}>
                            <span className={style.blockRelative}>
                              <span className={style.commentTxt}>Comment</span>
                            </span>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <div className={style.commentTreeContainer}>
            <div>
              <div
                className={style.commentTree}
                style={{ backgroundColor: theme.bgColor }}
              >
                {commentResults &&
                  commentResults.map((item) => (
                    <div style={{ marginBottom: "10px" }}>
                      <div className={style.itemAtEnd}>
                        <div className={style.sameLine}>
                          <div className={style.commentAvtar}>
                            <div className={style.cmntAvtarCtr}>
                              <div className={style.commentAuthorAvtar}>
                                <span className={style.avtarLink}>
                                  <div className={style.avtarCtr}>
                                    {item.author_details && (
                                      <div
                                        className={style.avtarContent}
                                        style={{
                                          backgroundColor:
                                            theme.showMoreBtnHoverBg,
                                        }}
                                      >
                                        <div className={style.loaded}>
                                          {item.author_details.profileImage && (
                                            <img
                                              className={style.avtarImg}
                                              src={
                                                item.author_details.profileImage
                                              }
                                            />
                                          )}
                                          {!item.author_details
                                            .profileImage && (
                                            <span
                                              className={style.avtarIcon}
                                              style={{
                                                textTransform: "capitalize",
                                              }}
                                            >
                                              {item.author_details.name.charAt(
                                                0
                                              )}
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className={style.commentMeta}>
                            <div className={style.cmntMetaCtr}>
                              <div className={style.comntMetaColmn}>
                                <div className={style.userDetailsMain}>
                                  <div className={style.userNameMain}>
                                    {item.author_details && (
                                      <span
                                        className={style.userName}
                                        style={{ color: theme.navTabColor }}
                                      >
                                        {item.author_details.name}
                                      </span>
                                    )}
                                  </div>
                                  <span
                                    className={style.dot}
                                    style={{ color: theme.navTabColor }}
                                  >
                                    •
                                  </span>
                                  <span
                                    className={style.commentTimingMain}
                                    style={{
                                      color: theme.popularCommunitiesTxt,
                                    }}
                                  >
                                    <DateFormatter createdAt={item.createdAt} />
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        {isLoggedIn &&
                          item.author &&
                          item.author === localStorage.getItem("userId") && (
                            <DeleteCommentComp
                              commentId={item._id}
                              fetchComments={fetchComments}
                            />
                          )}
                      </div>
                      <div className={style.userCommentMain}>
                        <div
                          className={style.userCmntContent}
                          style={{ color: theme.color }}
                        >
                          {item.content}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </main>
        <CommentRightComp
          showUserName={showUserName}
          setShowUserName={setShowUserName}
        />
      </div>
    </div>
  );
}

export default ShowCommentsComp;
