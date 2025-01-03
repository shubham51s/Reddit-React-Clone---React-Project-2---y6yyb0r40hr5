"use client";
import React, { useContext } from "react";
import style from "./submitpagecontent.module.css";
import CreateNewPostComp from "./createPostComp";
import PostRulesComp from "./postingRulesComp";
import { TheaterComedy } from "@mui/icons-material";
import ThemeContext from "@/app/contexts/ThemeContext";
import UserContext from "@/app/contexts/LoginContext";

function SubmitPageContentComp({ isChannelSelected }) {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={style.mainContainer}>
      <div>
        <div
          className={style.flexClmn}
          style={{ backgroundColor: theme.submitPageBg }}
        >
          <div></div>
          <div className={style.zIndex}>
            <div className={style.mainContent}>
              <CreateNewPostComp isChannelSelected={isChannelSelected} />
              <PostRulesComp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitPageContentComp;
