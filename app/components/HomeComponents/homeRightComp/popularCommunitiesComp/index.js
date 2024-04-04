"use client";
import React, { useContext, useState } from "react";
import Link from "next/link";
import style from "./popularcommunities.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";

function PopularComunitiesComp({ popularCommunities }) {
  const { theme, setTheme } = useContext(ThemeContext);

  const [isShowMore, setIsShowMore] = useState(true);

  return (
    <div className={style.popularCommunities}>
      <div className={style.aside}>
        <div
          className={style.aside2}
          style={{ backgroundColor: theme.popularCommunitiesBg }}
        >
          <div
            className={style.popularComMain}
            style={{ color: theme.popularCommunitiesTxt }}
          >
            <div className={style.communitiesHeadingMain}>
              <h2 className={style.communitiesHeading}>
                <div className={style.comminitiesHeadingTxt}>
                  Popular Communities
                </div>
              </h2>
            </div>
            <li className={style.communitiesListMain}>
              <ul className={style.communitiesUl}>
                {isShowMore &&
                  popularCommunities.slice(0, 5).map((item) => (
                    <li className={style.communityList} key={item._id}>
                      <Link
                        href="/"
                        className={style.communityLink}
                        style={{ color: theme.navTabColor }}
                      >
                        <span className={style.flexItmCtr}>
                          <span className={style.communityIconMain}>
                            <span className={style.txt20}>
                              <div className={style.communityImgMain}>
                                <img
                                  className={style.communityImg}
                                  src={item.image}
                                  alt={item.name}
                                />
                              </div>
                            </span>
                          </span>
                          <span className={style.aboutCommunityMain}>
                            <span className={style.communityTxtMain}>
                              <span
                                className={style.communityName}
                                style={{ color: theme.communityTxtClr }}
                              >
                                {item.name}
                              </span>
                            </span>
                            <span
                              className={style.communityMembers}
                              style={{ color: theme.popularCommunitiesTxt }}
                            >
                              {/* need to add members later */}
                            </span>
                          </span>
                        </span>
                        <span className={style.shrink0}></span>
                      </Link>
                    </li>
                  ))}
                {!isShowMore &&
                  popularCommunities.map((item) => (
                    <li className={style.communityList} key={item._id}>
                      <Link
                        href="/"
                        className={style.communityLink}
                        style={{ color: theme.navTabColor }}
                      >
                        <span className={style.flexItmCtr}>
                          <span className={style.communityIconMain}>
                            <span className={style.txt20}>
                              <div className={style.communityImgMain}>
                                <img
                                  className={style.communityImg}
                                  src={item.image}
                                  alt={item.name}
                                />
                              </div>
                            </span>
                          </span>
                          <span className={style.aboutCommunityMain}>
                            <span className={style.communityTxtMain}>
                              <span
                                className={style.communityName}
                                style={{ color: theme.communityTxtClr }}
                              >
                                {item.name}
                              </span>
                            </span>
                            <span
                              className={style.communityMembers}
                              style={{ color: theme.popularCommunitiesTxt }}
                            >
                              {/* need to add members later */}
                            </span>
                          </span>
                        </span>
                        <span className={style.shrink0}></span>
                      </Link>
                    </li>
                  ))}

                {isShowMore && (
                  <button
                    className={style.showBtn}
                    style={{ color: theme.navTabColor }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = theme.showMoreBtnHoverBg;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                    onClick={() => setIsShowMore(false)}
                  >
                    See more
                  </button>
                )}
                {!isShowMore && (
                  <button
                    className={style.showLessBtn}
                    style={{ color: theme.navTabColor }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = theme.showMoreBtnHoverBg;
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = "transparent";
                    }}
                    onClick={() => setIsShowMore(true)}
                  >
                    See less
                  </button>
                )}
              </ul>
            </li>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopularComunitiesComp;
