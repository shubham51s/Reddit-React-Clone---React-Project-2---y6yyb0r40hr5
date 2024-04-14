"use client";
import React, { useContext } from "react";
import style from "./notcontent.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";

function NoContentComp() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={style.mainContainer}>
      <div className={style.flexColmn}>
        <div></div>
        <div className={style.mainContent}>
          <div className={style.contentCtr}>
            <div
              className={style.contentHeading}
              style={{ color: theme.navTabColor }}
            >
              There is no content to display
            </div>
            <div
              className={style.contentDetails}
              style={{ color: theme.popularCommunitiesTxt }}
            >
              We were unable to find any content for this page.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoContentComp;
