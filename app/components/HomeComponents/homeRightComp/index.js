import React, { startTransition, useContext, useState } from "react";
import style from "./homerightocomp.module.css";
import Link from "next/link";
import PopularComunitiesComp from "./popularCommunitiesComp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import SortComp from "../sortContainer";
import JoinBtnComp from "./joinButton";
import CommentsComp from "./voteNcomments";
import ThemeContext from "@/app/contexts/ThemeContext";
import UserContext from "@/app/contexts/LoginContext";
import NoContentComp from "./noContent";
import Tooltip from "@mui/material/Tooltip";
import ViewMoreOptionComp from "./viewMoreComp";
import DateFormatter from "./daysFormatDate";

function HomeRightComp({
  popularCommunities,
  postResult,
  setImgOnly,
  setImgUrl,
  setPostResult,
  sortValue,
  setSortValue,
}) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { isLoggedIn, setPostItem } = useContext(UserContext);

  const handleImageClick = (e, url) => {
    e.stopPropagation;
    setImgUrl(url);
    setImgOnly(true);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.mainContent}>
        <main className={style.homeContent}>
          <SortComp
            theme={theme}
            sortValue={sortValue}
            setSortValue={setSortValue}
            postResult={postResult}
            setPostResult={setPostResult}
          />
          <hr
            className={style.sortBtmBorder}
            style={{ borderBottomColor: theme.sortBtmBorderClr }}
          ></hr>
          {postResult.length === 0 && <NoContentComp />}
          <div>
            <div className={style.flexColmn}>
              {postResult.length >= 1 &&
                postResult.map((item) => (
                  <article className={style.widthFull} key={item._id}>
                    <div
                      className={style.postListMain}
                      // style={{
                      //   backgroundColor: theme.bgColor,
                      // }}
                    >
                      <span className={style.creditBar}>
                        <span className={style.creditBarLeft}>
                          <span className={style.aboutCommunity}>
                            <span
                              className={style.aboutCommunityContent}
                              style={{ color: theme.communityTxtClr }}
                            >
                              <div className={style.communityImgMain}>
                                <div className={style.communityImgContent}>
                                  <div className={style.imgLogo}>
                                    {item.channel && item.channel.image && (
                                      <img
                                        className={style.communityImg}
                                        src={item.channel.image}
                                        alt={item.channel.name}
                                      />
                                    )}
                                    {item.channel && !item.channel.image && (
                                      <span
                                        className={style.channelLogo}
                                        style={{
                                          backgroundColor: theme.activeNavBg,
                                        }}
                                      >
                                        {item.channel.name.charAt(0)}
                                      </span>
                                    )}

                                    {!item.channel &&
                                      item.author.profileImage && (
                                        <img
                                          className={style.communityImg}
                                          src={item.author.profileImage}
                                          alt={item.author.name}
                                        />
                                      )}
                                    {!item.channel &&
                                      !item.author.profileImage && (
                                        <span
                                          className={style.channelLogo}
                                          style={{
                                            backgroundColor: theme.activeNavBg,
                                          }}
                                        >
                                          {item.author.name.charAt(0)}
                                        </span>
                                      )}
                                  </div>
                                </div>
                              </div>
                              {item.channel && (
                                <span className={style.communityName}>
                                  r/{item.channel.name}
                                </span>
                              )}

                              {!isLoggedIn && !item.channel && (
                                <span
                                  className={style.communityName}
                                  style={{ textTransform: "capitalize" }}
                                >
                                  {item.author.name}
                                </span>
                              )}

                              {isLoggedIn &&
                                item.author &&
                                item.author._id ===
                                  localStorage.getItem("userId") &&
                                !item.channel && (
                                  <span
                                    className={style.communityName}
                                    style={{
                                      fontSize: "12px",
                                      textTransform: "capitalize",
                                    }}
                                  >
                                    You
                                  </span>
                                )}
                              {isLoggedIn &&
                                !item.channel &&
                                item.author &&
                                item.author._id !=
                                  localStorage.getItem("userId") && (
                                  <span className={style.communityName}>
                                    {item.author.name}
                                  </span>
                                )}
                            </span>
                          </span>
                          <span
                            className={style.dot}
                            style={{ color: theme.popularCommunitiesTxt }}
                          >
                            •
                          </span>
                          <span
                            className={style.postTimeMain}
                            style={{ color: theme.popularCommunitiesTxt }}
                          >
                            <DateFormatter createdAt={item.createdAt} />
                          </span>
                        </span>
                        <span className={style.creditBarRight}>
                          {isLoggedIn &&
                            item.author &&
                            item.author._id != localStorage.getItem("userId") &&
                            !item.channel && <JoinBtnComp item={item} />}

                          {isLoggedIn && item.channel && (
                            <JoinBtnComp item={item} />
                          )}

                          {!isLoggedIn && <JoinBtnComp item={item} />}
                          {isLoggedIn &&
                            item.author &&
                            item.author._id ===
                              localStorage.getItem("userId") && (
                              <ViewMoreOptionComp
                                postId={item._id}
                                setPostResult={setPostResult}
                                postResult={postResult}
                                sortValue={sortValue}
                                item={item}
                              />
                            )}
                        </span>
                      </span>
                      <span
                        className={style.postTitle}
                        style={{ color: theme.popularCommunitiesTxt }}
                      >
                        {item.content}
                      </span>
                      <div
                        className={style.postMediaMain}
                        style={{ backgroundColor: theme.bgColor }}
                      >
                        <div
                          className={style.imgBorder}
                          style={{ borderColor: theme.sortBtmBorderClr }}
                        ></div>
                        <div className={style.postMediaContent}>
                          <div className={style.imgContents}>
                            {item.images[0] && (
                              <div
                                className={style.mediaLightBox}
                                onClick={(e) =>
                                  handleImageClick(e, item.images[0])
                                }
                                // style={{
                                //   backgroundImage: `url(${item.images[0]})`,
                                //   backgroundSize: "cover",
                                //   backgroundPosition: "center",
                                //   width: "800px",
                                //   height: "720px",
                                //   filter: "blur(5px)",
                                // }}
                              >
                                {/* <img
                                  className={style.mediaImg}
                                  src={item.images[0]}
                                /> */}
                                <img
                                  className={style.mediaImgMain}
                                  src={item.images[0]}
                                  alt={item.content}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <CommentsComp
                        upvote={item.likeCount}
                        comments={item.commentCount}
                        item={item}
                        setPostResult={setPostResult}
                        isLiked={item.isLiked}
                        isDisliked={item.isDisliked}
                        postResult={postResult}
                        sortValue={sortValue}
                      />
                    </div>
                    <hr
                      className={style.cardBtmBorder}
                      style={{ borderBottomColor: theme.sortBtmBorderClr }}
                    />
                  </article>
                ))}
            </div>
          </div>
        </main>
        {!isLoggedIn && (
          <PopularComunitiesComp popularCommunities={popularCommunities} />
        )}
      </div>
    </div>
  );
}

export default HomeRightComp;
