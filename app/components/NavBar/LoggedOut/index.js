"use client";
import React, { useContext, useState } from "react";
import style from "./loggedoutnav.module.css";
import Link from "next/link";
import RedditIcon from "@mui/icons-material/Reddit";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { BorderColor } from "@mui/icons-material";
import ThemeContext from "@/app/contexts/ThemeContext";

function LoginNavComp() {
  const { theme, setTheme } = useContext(ThemeContext);

  const [isDark, setIsDark] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);

  return (
    <header
      className={`${style.navContainer}}`}
      style={{ backgroundColor: theme.bgColor }}
    >
      <nav
        className={`${style.navMain}`}
        style={{ BorderColor: theme.borderColor }}
      >
        <div className={style.navLeft}>
          <Link href="/" className={style.redditLogoLink}>
            <span className={style.redditLogo}>
              <span className={style.redditIcon}>
                <RedditIcon
                  style={{ width: "42px", height: "42px", color: "orangered" }}
                />
              </span>
              <span
                className={`${style.redditName} ${
                  isDark ? style.redditDarkLogo : style.redditLightLogo
                }`}
              >
                {/* responsiveness pending */}
                reddit
              </span>
            </span>
          </Link>
        </div>
        <div className={style.navMiddle}>
          <div className={style.navMiddleContent}>
            <div
              className={`${style.inputMain} ${
                isDark ? style.inputMainDark : style.inputMainLight
              }`}
            >
              <div>
                <form
                  className={`${style.inputForm} ${
                    isDark ? style.inputFormD : style.inputFormL
                  }`}
                  autoComplete="off"
                >
                  <label className={style.inputLabel}>
                    <div className={style.labelContainer}>
                      <span className={style.searchIcon}>
                        <SearchIcon style={{ fontSize: "20px" }} />
                      </span>
                      <span className={style.inputContainer}>
                        <input
                          className={`${
                            isDark ? style.searchInputD : style.searchInputL
                          }`}
                          type="text"
                          autoComplete="off"
                          placeholder="Search Reddit"
                        />
                      </span>
                      <span className={style.clearIcon}>
                        {/* need to add functionality later */}
                        <ClearIcon
                          style={{
                            fontSize: "16px",
                            paddingTop: "8px",
                            cursor: "pointer",
                          }}
                        />
                      </span>
                    </div>
                  </label>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className={style.navRight}>
          <span className={style.rightContent}></span>
          <span className={style.rightContent}>
            <span className={style.getAppMain}>
              <button
                className={`${style.getAppBtn} ${
                  isDark ? style.getAppBtnD : style.getAppBtnL
                }`}
              >
                <span className={style.btnCtr}>
                  <span className={style.getAppCode}>
                    <QrCodeScannerIcon style={{ fontSize: "18px" }} />
                  </span>
                  <span className={style.getAppName}>Get app</span>
                </span>
              </button>
            </span>
          </span>
          <span className={style.rightContent}>
            <Link href="/" className={style.loginLink}>
              <span className={style.loginCtr}>
                <span className={style.loginTxt}>Log In</span>
              </span>
            </Link>
          </span>
          <div className={style.rightMenu}>
            <button className={style.rightMenuBtn}>
              <span className={style.dotItemCtr}>
                <span className={style.flex}>
                  <MoreHorizIcon
                    className={`${isDark ? style.dotIconD : style.dotIconL}`}
                  />
                </span>
              </span>
            </button>
            <div
              className={`${isDrawer ? style.userDrawerContent : style.hide}`}
            >
              {/* need to add drawer logic */}
              <ul
                className={`${style.userDrawer} ${
                  isDark ? style.userDrawerD : style.userDrawerL
                }`}
              >
                <li className={style.userDrawerList}>
                  <span
                    className={`${style.loginLink} ${
                      isDark ? style.loginLinkD : style.loginLinkL
                    }`}
                  >
                    <span className={style.linkContent}>
                      <span className={style.drawerListIcon}>
                        <ExitToAppIcon />
                      </span>
                      <span className={style.drawerListName}>
                        <span className={style.drawerListTxt}>
                          Log In / Sign Up
                        </span>
                      </span>
                    </span>
                    <span className={style.shrink}></span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default LoginNavComp;
