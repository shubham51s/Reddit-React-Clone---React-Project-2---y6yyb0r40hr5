"use client";
import React, { useContext } from "react";
import style from "./submitpage.module.css";
import SubmitPageHeaderComp from "../components/SubmitPageComponents/HeaderComponents";
import SubmitPageContentComp from "../components/SubmitPageComponents/PageContentComp";
import ThemeContext from "../contexts/ThemeContext";

function CreatePostPage() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={style.mainContainer}>
      <div
        className={style.innerContainer}
        style={{ backgroundColor: theme.bgColor }}
      >
        <div className={style.content}>
          <div>
            <SubmitPageHeaderComp />
          </div>
          <div>
            <SubmitPageContentComp />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;
