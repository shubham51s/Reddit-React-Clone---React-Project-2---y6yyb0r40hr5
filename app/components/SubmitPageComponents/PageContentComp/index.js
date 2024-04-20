"use client";
import React, { useContext } from "react";
import style from "./submitpagecontent.module.css";
import CreateNewPostComp from "./createPostComp";
import PostRulesComp from "./postingRulesComp";
import { TheaterComedy } from "@mui/icons-material";
import ThemeContext from "@/app/contexts/ThemeContext";
import UserContext from "@/app/contexts/LoginContext";

function SubmitPageContentComp() {
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
            {/* need to add 2 extra div here if required */}
            <div className={style.mainContent}>
              <CreateNewPostComp />
              <PostRulesComp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitPageContentComp;
