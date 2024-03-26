"use client";
import React, { useContext, useState } from "react";
import style from "./homeleftcomp.module.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { colors } from "@mui/material";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";

function HomeLeftComp({ theme }) {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div
      className={style.mainContainer}
      style={{ borderRightColor: theme.borderColor }}
    >
      <nav className={style.navContainer}>
        {/* need to add other navigation tab */}
        {/* need to add later */}
        <div>
          <li className={style.navList}>
            <span
              className={style.navLink}
              style={{
                color: activeTab === 0 ? theme.activeNavClr : theme.navTabColor,
                backgroundColor:
                  activeTab === 0 ? theme.activeNavBg : "transparent",
              }}
              onClick={() => setActiveTab(0)}
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
                color: activeTab === 1 ? theme.activeNavClr : theme.navTabColor,
                backgroundColor:
                  activeTab === 1 ? theme.activeNavBg : "transparent",
              }}
              onClick={() => setActiveTab(1)}
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
      </nav>
    </div>
  );
}

export default HomeLeftComp;
