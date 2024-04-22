"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./homeleftdrawercomp.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { colors } from "@mui/material";
import ThemeContext from "@/app/contexts/ThemeContext";
import UserContext from "@/app/contexts/LoginContext";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { useRouter } from "next/navigation";

function HomeLeftDrawerComp({ setIsNavDrawer }) {
  const { theme } = useContext(ThemeContext);
  const drawerRef = useRef(null);
  const router = useRouter();
  const {
    setCreateCommunityModal,
    setUserLoginModal,
    isLoggedIn,
    isPopular,
    setIsPopular,
  } = useContext(UserContext);

  const handleCreateCommunity = () => {
    if (isLoggedIn) {
      setCreateCommunityModal(true);
    } else {
      setUserLoginModal(true);
    }
  };

  const sortResults = (input) => {
    setIsPopular(input);
    if (input) {
      sessionStorage.setItem("popularResults", "true");
      setIsNavDrawer(false);
    } else {
      sessionStorage.removeItem("popularResults");
      setIsNavDrawer(false);
    }
  };

  const handleCreatePostBtnClick = (e) => {
    sessionStorage.removeItem("createPostId");
    router.push("submit");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target)) {
        setIsNavDrawer(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={style.mainContainer}
      style={{ borderRightColor: theme.borderColor }}
      ref={drawerRef}
    >
      <nav
        className={style.mainContainerInner}
        style={{ backgroundColor: theme.bgColor }}
      >
        <div>
          <li className={style.navList}>
            <span
              className={style.navLink}
              style={{
                color: !isPopular ? theme.activeNavClr : theme.navTabColor,
                backgroundColor: !isPopular ? theme.activeNavBg : "transparent",
              }}
              onClick={() => sortResults(false)}
            >
              <span className={style.navTabContent}>
                <span className={style.iconMain}>
                  <HomeOutlinedIcon
                    style={{ backgroundColor: "transparent" }}
                  />
                </span>
                <span className={style.nameMain}>
                  <span className={style.tabName}>Home</span>
                </span>
              </span>
              <span className={style.shrink0}></span>
            </span>
          </li>
          <li className={style.navList}>
            <span
              className={style.navLink}
              style={{
                color: isPopular ? theme.activeNavClr : theme.navTabColor,
                backgroundColor: isPopular ? theme.activeNavBg : "transparent",
              }}
              onClick={() => sortResults(true)}
            >
              <span className={style.navTabContent}>
                <span className={style.iconMain}>
                  <OutboundOutlinedIcon />
                </span>
                <span className={style.nameMain}>
                  <span className={style.tabName}>Popular</span>
                </span>
              </span>
              <span className={style.shrink0}></span>
            </span>
          </li>
        </div>{" "}
        <hr
          className={style.btmBorderLine}
          style={{ borderColor: theme.sortBtmBorderClr }}
        />{" "}
        <div className={style.communitiesContainer}>
          <div className={style.communityHeading}>
            <li className={style.communityList}>
              <div
                className={style.headingMain}
                style={{ color: theme.navTabColor }}
              >
                <span className={style.headingContent}>
                  <span className={style.shrink}>
                    <span className={style.text14}>
                      <span
                        className={style.communityTxt}
                        style={{ color: theme.popularCommunitiesTxt }}
                      >
                        Other
                      </span>
                    </span>
                  </span>
                </span>
                <span></span>
              </div>
            </li>
          </div>
          <div className={style.communityContent}>
            <div>
              <div>
                <li className={style.createCommunity}>
                  <div
                    className={style.createCommunityMain}
                    style={{ color: theme.navTabColor }}
                    onClick={(e) => handleCreatePostBtnClick(e)}
                  >
                    <span className={style.flexCtr}>
                      <span className={style.createIconMain}>
                        <AddOutlinedIcon />
                      </span>
                      <span className={style.createComTxtMain}>
                        <span className={style.createCommunityTxt}>
                          Create Post
                        </span>
                      </span>
                    </span>
                    <span></span>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
        <div className={style.communitiesContainer}>
          <div className={style.communityHeading}>
            <li className={style.communityList}>
              <div
                className={style.headingMain}
                style={{ color: theme.navTabColor }}
              >
                <span className={style.headingContent}>
                  <span className={style.shrink}>
                    <span className={style.text14}>
                      <span
                        className={style.communityTxt}
                        style={{ color: theme.popularCommunitiesTxt }}
                      >
                        COMMUNITIES
                      </span>
                    </span>
                  </span>
                </span>
                <span></span>
              </div>
            </li>
          </div>
          <div className={style.communityContent}>
            <div>
              <div>
                <li className={style.createCommunity}>
                  <div
                    className={style.createCommunityMain}
                    style={{ color: theme.navTabColor }}
                    onClick={handleCreateCommunity}
                  >
                    <span className={style.flexCtr}>
                      <span className={style.createIconMain}>
                        <AddOutlinedIcon />
                      </span>
                      <span className={style.createComTxtMain}>
                        <span className={style.createCommunityTxt}>
                          Create a community
                        </span>
                      </span>
                    </span>
                    <span></span>
                  </div>
                </li>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default HomeLeftDrawerComp;
