"use client";
import React, { useContext, useEffect, useRef } from "react";
import style from "./leftnavdrawer.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import MenuIcon from "@mui/icons-material/Menu";

function LeftNavDrawer({ setIsNavDrawer, isNavDrawer }) {
  const { theme } = useContext(ThemeContext);
  const menuRef = useRef(null);

  const handleMenuclick = (e) => {
    setIsNavDrawer(!isNavDrawer);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsNavDrawer(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return document.body.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={style.mainContainer}>
      <button
        className={style.menuBtn}
        style={{ color: theme.navTabColor }}
        onClick={(e) => handleMenuclick()}
        ref={menuRef}
      >
        <span className={style.btnInner}>
          <span className={style.flex}>
            <MenuIcon />
          </span>
        </span>
      </button>
    </div>
  );
}

export default LeftNavDrawer;
