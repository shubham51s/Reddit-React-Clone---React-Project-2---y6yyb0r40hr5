"use client";
import React, { use, useContext, useState } from "react";
import style from "./homeleftcomp.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { colors } from "@mui/material";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import ThemeContext from "@/app/contexts/ThemeContext";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import UserContext from "@/app/contexts/LoginContext";

function HomeLeftComp() {
  const { theme, setTheme } = useContext(ThemeContext);
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
    } else {
      sessionStorage.removeItem("popularResults");
    }
  };

  return (
    <div
      className={style.mainContainer}
      style={{ borderColor: theme.borderLine }}
    >
      <nav className={style.navContainer}>
        {/* need to add other navigation tab */}
        {/* need to add later */}
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
        </div>
        <hr
          className={style.btmBorderLine}
          style={{ borderColor: theme.sortBtmBorderClr }}
        />
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

export default HomeLeftComp;
