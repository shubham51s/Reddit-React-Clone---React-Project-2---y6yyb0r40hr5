"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import Link from "next/link";
import style from "./loggedoutnav.module.css";
import RedditIcon from "@mui/icons-material/Reddit";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import AdsClickIcon from "@mui/icons-material/AdsClick";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ModeNightOutlinedIcon from "@mui/icons-material/ModeNightOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import FormGroup from "@mui/material/FormGroup";
// import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import Slider from "@mui/material/Slider";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ThemeContext from "@/app/contexts/ThemeContext";
import UserContext from "@/app/contexts/LoginContext";
import { ST } from "next/dist/shared/lib/utils";
import NavSearchComp from "./navSearchComp";
import LeftNavDrawer from "./navDrawer";
import Tooltip from "@mui/material/Tooltip";

function LogoutNavComp({ setIsNavDrawer, isNavDrawer, setIsGetRedditApp }) {
  const { theme, handleThemeChange, isDarkMode, setIsDarkMode } =
    useContext(ThemeContext);
  const { setUserLoginModal, setIsLoggedIn, isLoggedIn } =
    useContext(UserContext);
  const [loginUserDrawer, setLoginUserDrawer] = useState(false);
  const [isDrawer, setIsDrawer] = useState(false);

  const loginRef = useRef(null);
  const buttonRef = useRef(null);
  const inboxBtnRef = useRef(null);
  const inboxContentRef = useRef(null);
  const [userProfile, setUserProfile] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(true);
  const [openInbox, setOpenInbox] = useState(false);

  const handleUserBtnClick = (e) => {
    e.stopPropagation();
    setLoginUserDrawer(!loginUserDrawer);
  };

  const handleLogoutBtnClick = (e) => {
    e.stopPropagation();
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
  };

  const handleThemes = (e) => {
    handleThemeChange(e.target.checked);
    setIsDarkMode(e.target.checked);
    if (e.target.checked) {
      localStorage.setItem("darkModeIsActive", "true");
    } else {
      localStorage.removeItem("darkModeIsActive");
    }
  };

  const handleNotificatoinClick = (e) => {
    e.stopPropagation();
    setOpenInbox(!openInbox);
  };

  const handleGetAppClick = (e) => {
    e.stopPropagation();
    setIsGetRedditApp(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(e.target) &&
        loginRef.current &&
        !loginRef.current.contains(e.target)
      ) {
        setLoginUserDrawer(false);
      }
    };

    const handleInboxClick = (e) => {
      if (
        inboxContentRef.current &&
        !inboxContentRef.current.contains(e.target) &&
        inboxBtnRef.current &&
        !inboxBtnRef.current.contains(e.target)
      ) {
        setOpenInbox(false);
      }
    };

    document.body.addEventListener("click", handleInboxClick);
    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.body.removeEventListener("click", handleInboxClick);
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className={style.mainContainer}>
      <header
        className={style.headerContainer}
        style={{ backgroundColor: theme.bgColor, color: theme.color }}
      >
        <nav
          className={style.navContent}
          style={{ borderColor: theme.borderLine }}
        >
          <div className={style.navLeft}>
            <LeftNavDrawer
              setIsNavDrawer={setIsNavDrawer}
              isNavDrawer={isNavDrawer}
            />

            <Link href="/" className={style.redditLogoLink}>
              <Tooltip title="Go to Reddit Home">
                <span className={style.redditLogo}>
                  <span className={style.redditIcon}>
                    <RedditIcon
                      style={{
                        width: "42px",
                        height: "42px",
                        color: "orangered",
                      }}
                    />
                  </span>
                  <span
                    className={style.redditName}
                    style={{ color: theme.redditLogo }}
                  >
                    {/* responsiveness pending */}
                    reddit
                  </span>
                </span>
              </Tooltip>
            </Link>
          </div>
          {/* here is input */}
          <NavSearchComp />
          {/* here */}
          {isLoggedIn && (
            <div className={style.redditRightMain}>
              <div className={style.leftNavMain}>
                <span className={style.advertizeMain}>
                  <span className={style.advertizeTab}>
                    <span
                      className={style.adevertizeLink}
                      style={{ color: theme.navTabColor }}
                    >
                      <span className={style.adevertizeIconMain}>
                        <span className={style.flex}>
                          <Tooltip title="Advertise on Reddit">
                            <AdsClickIcon />
                          </Tooltip>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
                <span className={style.messageMain}>
                  <span className={style.advertizeTab}>
                    <span
                      className={style.adevertizeLink}
                      style={{ color: theme.navTabColor }}
                    >
                      <span className={style.adevertizeIconMain}>
                        <span className={style.flex}>
                          <Tooltip title="Open chat">
                            <TextsmsOutlinedIcon />
                          </Tooltip>
                        </span>
                      </span>
                    </span>
                  </span>
                </span>
                <span className={style.createPostMain}>
                  <span className={style.advertizeTab}>
                    <span
                      className={style.createLink}
                      style={{ color: theme.navTabColor }}
                    >
                      <Tooltip title="Create post">
                        <span className={style.adevertizeIconMain}>
                          <span className={style.createIconMain}>
                            <AddOutlinedIcon style={{ fontSize: "1.6rem" }} />
                          </span>
                          <span className={style.createTxt}>Create</span>
                        </span>
                      </Tooltip>
                    </span>
                  </span>
                </span>
                <span className={style.notificationMain}>
                  <span className={style.advertizeTab}>
                    <span
                      className={style.adevertizeLink}
                      style={{ color: theme.navTabColor }}
                    >
                      <span className={style.adevertizeIconMain}>
                        <Tooltip title="Open inbox">
                          <span
                            className={style.flex}
                            onClick={(e) => handleNotificatoinClick(e)}
                            ref={inboxBtnRef}
                          >
                            <NotificationsNoneOutlinedIcon />
                          </span>
                        </Tooltip>
                      </span>
                    </span>
                  </span>
                </span>
                {openInbox && (
                  <div
                    className={style.notificationContent}
                    style={{ borderColor: theme.borderLine }}
                    ref={inboxContentRef}
                  >
                    <div className={style.overflowHidden}>
                      <div className={style.notificationTop}>
                        <div className={style.contentHeading}>
                          <div className={style.contentHeaderCtr}>
                            <span className={style.headingSemibold}>
                              Notifications
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className={style.notificationBtm}>
                        <div className={style.notificationItmCtr}>
                          <img
                            className={style.notificationContentImg}
                            src="	https://www.redditstatic.com/shreddit/assets/snoovatar-full-hi.png"
                            alt="empty inbox image"
                          />
                          <p
                            className={style.notificationTxt1}
                            style={{ color: theme.navTabColor }}
                          >
                            Turn on email digest
                          </p>
                          <p
                            className={style.notificationTxt2}
                            style={{ color: theme.popularCommunitiesTxt }}
                          >
                            Stay in the loop on content from communities you
                            love right in your email inbox.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className={style.userProfileContainer}>
                <div className={style.profileContent}>
                  <div
                    className={style.navProfile}
                    style={{ color: theme.activeNavClr }}
                  >
                    <button
                      className={style.userProfileButton}
                      onClick={(e) => handleUserBtnClick(e)}
                      ref={buttonRef}
                    >
                      <span className={style.userProfileBtnCtr}>
                        <span className={style.userProfileFlex}>
                          <span className={style.profileTabInner}>
                            <Tooltip title="Open profile menu">
                              <span className={style.profileImgOuter}>
                                <img
                                  className={style.userProfileImage}
                                  src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png"
                                  alt="user profile picture"
                                />
                              </span>
                            </Tooltip>
                          </span>
                        </span>
                      </span>
                    </button>
                  </div>
                  {loginUserDrawer && (
                    <div
                      className={style.userProfileContent}
                      style={{ backgroundColor: theme.bgColor }}
                      ref={loginRef}
                    >
                      <ul className={style.userProfileContentMain}>
                        <li className={style.userProfileListMain}>
                          <span
                            className={style.userProfileLink}
                            style={{ color: theme.navTabColor }}
                          >
                            <span className={style.userProfileInner}>
                              <span className={style.userProfileIconMain}>
                                <span className={style.profileIconInner}>
                                  <div>
                                    <span className={style.profileIconCtr}>
                                      <span className={style.userIconCircle}>
                                        <img
                                          className={style.userProfilePicture}
                                          src="	https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png"
                                          alt="user profile picture"
                                        />
                                      </span>
                                    </span>
                                  </div>
                                </span>
                              </span>
                              <span className={style.userNameContent}>
                                <span className={style.viewProfileTxt}>
                                  View Profile
                                </span>
                                <span
                                  className={style.userNameTxt}
                                  style={{ color: theme.popularCommunitiesTxt }}
                                >
                                  {/* need to add user name later */}
                                  {localStorage.getItem("userName")}
                                </span>
                              </span>
                            </span>
                            <span></span>
                          </span>
                        </li>
                        <li className={style.loginUserList}>
                          <div
                            className={style.loginUserListContent}
                            style={{ color: theme.navTabColor }}
                          >
                            <span className={style.userListLeft}>
                              <span className={style.userListIconContent}>
                                <ModeNightOutlinedIcon />
                              </span>
                              <span className={style.userListNameMain}>
                                <span className={style.userListNameTxt}>
                                  Dark Mode
                                </span>
                                <span></span>
                              </span>
                            </span>
                            <span className={style.userListRight}>
                              <span className={style.userListToggler}>
                                <div className={style.darkModeSwitch}>
                                  <span
                                    className={style.switchInput}
                                    style={{
                                      backgroundColor: theme.activeNavBg,
                                    }}
                                  >
                                    <IOSSwitch
                                      checked={isDarkMode}
                                      onChange={handleThemes}
                                    />
                                  </span>
                                </div>
                              </span>
                            </span>
                          </div>
                        </li>
                        <li
                          className={style.logOutList}
                          onClick={(e) => handleLogoutBtnClick(e)}
                        >
                          <div
                            className={style.loginUserListContent}
                            style={{ color: theme.navTabColor }}
                          >
                            <span className={style.userListLeft}>
                              <span className={style.userListIconContent}>
                                <ExitToAppIcon />
                              </span>
                              <span className={style.userListNameMain}>
                                <span className={style.userListNameTxt}>
                                  Log Out
                                </span>
                                <span></span>
                              </span>
                            </span>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          {!isLoggedIn && (
            <div className={style.navRight}>
              <span className={style.rightContent}></span>
              <span className={style.rightContent}>
                <span className={style.getAppMain}>
                  <button
                    className={style.getAppBtn}
                    style={{
                      backgroundColor: theme.activeNavBg,
                      color: theme.activeNavClr,
                    }}
                    onClick={(e) => handleGetAppClick(e)}
                  >
                    <Tooltip title="Get the Reddit app">
                      <span className={style.btnCtr}>
                        <span className={style.getAppCode}>
                          <QrCodeScannerIcon style={{ fontSize: "18px" }} />
                        </span>
                        <span className={style.getAppName}>Get app</span>
                      </span>
                    </Tooltip>
                  </button>
                </span>
              </span>
              <span className={style.rightContent}>
                <Tooltip title="Log in Reddit">
                  <Link
                    href="/"
                    className={style.loginLink}
                    onClick={() => setUserLoginModal(true)}
                  >
                    <span className={style.loginCtr}>
                      <span className={style.loginTxt}>Log In</span>
                    </span>
                  </Link>
                </Tooltip>
              </span>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
}

export default LogoutNavComp;

const IOSSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "rgb(80, 80, 239)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
