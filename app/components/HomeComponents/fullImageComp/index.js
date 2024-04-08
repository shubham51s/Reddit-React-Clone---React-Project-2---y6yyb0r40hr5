"use client";
import React from "react";
import style from "./showfullimagecomp.module.css";
import CloseIcon from "@mui/icons-material/Close";

function FullImgComp({ setImgOnly, imageUrl }) {
  const handleCloseBtn = (e) => {
    e.stopPropagation();
    setImgOnly(false);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.lightboxTemplateContent}>
        <div className={style.mediaLightbox}>
          <img className={style.image1} src={imageUrl} />
          <img className={style.image2} src={imageUrl} />
        </div>
      </div>
      <button
        className={style.closeLightbox}
        onClick={(e) => handleCloseBtn(e)}
      >
        <span className={style.btnCenter}>
          <span className={style.btnInner}>
            <CloseIcon />
          </span>
        </span>
      </button>
    </div>
  );
}

export default FullImgComp;
