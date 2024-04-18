"use client";
import React, { useContext, useEffect, useRef } from "react";
import style from "./getredditapp.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import CloseIcon from "@mui/icons-material/Close";

function GetRedditComp({ isGetRedditApp, setIsGetRedditApp }) {
  const { theme } = useContext(ThemeContext);
  const getAppRef = useRef(null);

  const handleCloseBtnClick = (e) => {
    e.stopPropagation();
    setIsGetRedditApp(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (getAppRef.current && !getAppRef.current.contains(e.target)) {
        setIsGetRedditApp(false);
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
      style={{ backgroundColor: theme.createCommunityBg }}
      ref={getAppRef}
    >
      <div className={style.topContainer}>
        <h3 className={style.heading}>Get the Reddit app</h3>
        <div className={style.closeBtnMain}>
          <button
            className={style.closeBtn}
            style={{
              backgroundColor: theme.activeNavBg,
              color: theme.activeNavClr,
            }}
            onClick={(e) => handleCloseBtnClick(e)}
          >
            <span className={style.btnCenter}>
              <span className={style.text20}>
                <CloseIcon />
              </span>
            </span>
          </button>
        </div>
      </div>
      <div className={style.btmContainer}>
        <div className={style.scanTxtMain}>
          <span>Scan this QR code to download the app now</span>
        </div>
        <div className={style.imageMain}>
          <div className={style.loaded}>
            <img
              className={style.codeImg}
              src="https://www.redditstatic.com/shreddit/assets/shreddit-qr-code.svg"
              alt="scan code to download app"
            />
          </div>
        </div>
        <div className={style.optionsTxt}>
          Or check it out in the app stores
        </div>
        <div className={style.storeMain}>
          <span className={style.playStoreLink}>
            <div className={style.playStoreLoaded}>
              <img
                className={style.playStoreImg}
                src="https://www.redditstatic.com/shreddit/assets/google-play.svg"
                alt="download on play store"
              />
            </div>
          </span>
          <span className={style.appStoreLink}>
            <div className={style.appStoreLoaded}>
              <img
                className={style.appStoreImg}
                src="https://www.redditstatic.com/shreddit/assets/app-store.svg"
                alt="download on app store"
              />
            </div>
          </span>
        </div>
      </div>
    </div>
  );
}

export default GetRedditComp;
