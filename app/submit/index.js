"use client";
import React, { useContext, useState } from "react";
import style from "./submitpage.module.css";
import SubmitPageHeaderComp from "../components/SubmitPageComponents/HeaderComponents";
import SubmitPageContentComp from "../components/SubmitPageComponents/PageContentComp";
import ThemeContext from "../contexts/ThemeContext";

function CreatePostPage() {
  const { theme } = useContext(ThemeContext);
  const [isChannelSelected, setIsChannelSelected] = useState(
    sessionStorage.getItem("createPostId") ? true : false
  );

  return (
    <div className={style.mainContainer}>
      <div
        className={style.innerContainer}
        style={{ backgroundColor: theme.bgColor }}
      >
        <div className={style.content}>
          <div>
            <SubmitPageHeaderComp setIsChannelSelected={setIsChannelSelected} />
          </div>
          <div>
            <SubmitPageContentComp isChannelSelected={isChannelSelected} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreatePostPage;
