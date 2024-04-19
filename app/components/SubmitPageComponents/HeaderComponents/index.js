"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./submitpageheader.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import RedditIcon from "@mui/icons-material/Reddit";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ClearIcon from "@mui/icons-material/Clear";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import SearchIcon from "@mui/icons-material/Search";
import OutboundOutlinedIcon from "@mui/icons-material/OutboundOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import AdsClickOutlinedIcon from "@mui/icons-material/AdsClickOutlined";
import { keyframes, styled } from "@mui/material/styles";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import Switch from "@mui/material/Switch";
import Box from "@mui/material/Box";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import UserContext from "@/app/contexts/LoginContext";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import NavSearchComp from "../../NavBar/LoggedIn/navSearchComp";

function SubmitPageHeaderComp() {
  const { theme, handleThemeChange, isDarkMode, setIsDarkMode } =
    useContext(ThemeContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const router = useRouter();
  const userRef = useRef(null);
  const profileRef = useRef(null);
  const createPostRef = useRef(null);
  const createPostListRef = useRef(null);
  const inboxBtnRef = useRef(null);
  const inboxContentRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [createPostDropdown, setCreatePostDropdown] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);
  const [openInbox, setOpenInbox] = useState(false);

  const handleUserDropdown = () => {
    setUserDropdown(!userDropdown);
  };

  const handleCreatePostBtn = () => {
    setCreatePostDropdown(!createPostDropdown);
  };

  const handleInputClick = () => {
    setShowResults(true);
  };

  const handleUserSearch = (e) => {
    setUserInput(e.target.value);
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

  const handleOnlineStatus = (e) => {
    setOnlineStatus(e.target.checked);
  };

  const handleLogoutBtnClick = (e) => {
    e.stopPropagation();
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
    router.push("/");
  };

  const handleNotificatoinClick = (e) => {
    e.stopPropagation();
    setOpenInbox(!openInbox);
  };

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/");
    }
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    const handleUserClick = (e) => {
      if (
        userRef.current &&
        !userRef.current.contains(e.target) &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setUserDropdown(false);
      }
    };

    const handleCreatePostClick = (e) => {
      if (
        createPostRef.current &&
        !createPostRef.current.contains(e.target) &&
        createPostListRef.current &&
        !createPostListRef.current.contains(e.target)
      ) {
        setCreatePostDropdown(false);
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

    document.body.addEventListener("click", handleClickOutside);
    document.body.addEventListener("click", handleUserClick);
    document.body.addEventListener("click", handleCreatePostClick);
    document.body.addEventListener("click", handleInboxClick);

    return () => {
      document.body.removeEventListener("click", handleClickOutside);
      document.body.removeEventListener("click", handleUserClick);
      document.body.removeEventListener("click", handleCreatePostClick);
      document.body.removeEventListener("click", handleInboxClick);
    };
  }, []);

  return (
    <header
      className={style.headerContainer}
      style={{ color: theme.headerClr }}
    >
      <div
        className={style.mainContainer}
        style={{
          backgroundColor: theme.headerBg,
          borderColor: theme.headerBorderClr,
        }}
      >
        <div className={style.headerLeftContent}>
          <Tooltip title="Go to Reddit Home">
            <span className={style.logoMain} onClick={(e) => router.push("/")}>
              <RedditIcon style={{ fontSize: "38px", color: "orangered" }} />
              {/* need to add reddit name later */}
            </span>
          </Tooltip>
          <div className={style.createPostMain}>
            <button
              className={style.createPostBtn}
              style={{
                color: theme.headerClr,
              }}
              onClick={handleCreatePostBtn}
              ref={createPostRef}
            >
              <span className={style.createPostTxt}>Create Post</span>
              <span className={style.addIconLogo}>
                <AddIcon style={{ color: theme.headerClr, fontSize: "28px" }} />
              </span>
              <span className={style.downArrow}>
                <KeyboardArrowDownIcon style={{ color: theme.headerClr }} />
              </span>
            </button>
            {createPostDropdown && (
              <div
                className={style.createPostContent}
                style={{
                  backgroundColor: theme.headerBg,
                  borderColor: theme.headerBorderClr,
                  color: theme.headerClr,
                }}
                ref={createPostListRef}
              >
                <div className={style.feeds} style={{ color: theme.arrowClr }}>
                  Feeds
                </div>
                <span className={style.focusHome}>
                  <span className={style.focusIcon}>
                    <HomeOutlinedIcon />
                  </span>
                  <span className={style.focusTxt}>Home</span>
                </span>
                <span className={style.focusPopular}>
                  <span className={style.focusIcon}>
                    <OutboundOutlinedIcon />
                  </span>
                  <span className={style.focusTxt}>Popular</span>
                </span>
                <div className={style.feeds} style={{ color: theme.arrowClr }}>
                  Other
                </div>
                <span className={style.focusInbox}>
                  <span className={style.focusIcon}>
                    <ChatBubbleOutlineOutlinedIcon
                      style={{ fontSize: "22px" }}
                    />
                  </span>
                  <span className={style.focusTxt}>Messages</span>
                </span>
                <span className={style.focusCreatePost}>
                  <span className={style.focusIcon}>
                    <AddIcon />
                  </span>
                  <span className={style.focusTxt}>Create Post</span>
                </span>
                <span className={style.focusNotificationInbox}>
                  <span className={style.focusIcon}>
                    <NotificationsOutlinedIcon />
                  </span>
                  <span className={style.focusTxt}>Notifications</span>
                </span>
              </div>
            )}
          </div>
          <NavSearchComp />
        </div>
        <div className={style.headerRightContent}>
          <div className={style.popularIconMain}>
            <div className={style.popularIconContent}>
              <span className={style.popularTabLink}>
                <Tooltip title="View popular posts">
                  <span className={style.popularIcon}>
                    <OutboundOutlinedIcon />
                  </span>
                </Tooltip>
              </span>
            </div>
          </div>
          <div className={style.rightSideMain}>
            <div className={style.rightSideContent}>
              <div className={style.changeUsernameTooltip}>
                <span className={style.messageIconMain}>
                  <span className={style.messageLink}>
                    <Tooltip title="Open chat">
                      <span className={style.messageIcon}>
                        <ChatBubbleOutlineOutlinedIcon />
                      </span>
                    </Tooltip>
                  </span>
                </span>
                <span className={style.notificationMain}>
                  <button className={style.notificationBtn}>
                    <div className={style.notificationBtnInner}>
                      <Tooltip title="Open inbox">
                        <span
                          className={style.notificationIcon}
                          ref={inboxBtnRef}
                          onClick={(e) => handleNotificatoinClick(e)}
                        >
                          <NotificationsOutlinedIcon />
                        </span>
                      </Tooltip>
                    </div>
                  </button>
                  {openInbox && (
                    <div
                      className={style.notificationContent}
                      style={{
                        borderColor: theme.borderLine,
                        backgroundColor: theme.activeNavBg,
                      }}
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
                </span>
                <span className={style.createIconMain}>
                  <button className={style.createIconBtn}>
                    <Tooltip title="Create post">
                      <span className={style.createIcon}>
                        <AddIcon />
                      </span>
                    </Tooltip>
                  </button>
                </span>
                <span className={style.advertiseMain}>
                  <span className={style.adLink}>
                    <Tooltip title="Advertise on Reddit">
                      <span className={style.adIcon}>
                        <AdsClickOutlinedIcon />
                      </span>
                    </Tooltip>
                  </span>
                </span>
                <span className={style.emptyIcon}></span>
              </div>
              <div>
                <Tooltip title="Open profile menu">
                  <button
                    className={style.userDropdownId}
                    style={{ borderColor: userDropdown ? "#EDEFF1" : "" }}
                    onClick={handleUserDropdown}
                    ref={profileRef}
                  >
                    <span className={style.dropdownBtnInner}>
                      <span className={style.userContentMain}>
                        <div className={style.userProfileMain}>
                          <AccountBoxIcon style={{ fontSize: "28px" }} />
                          {onlineStatus && (
                            <FiberManualRecordIcon
                              style={{
                                fontSize: "12px",
                                marginLeft: "-10px",
                                color: "green",
                              }}
                            />
                          )}
                        </div>
                        <span className={style.userNameMain}>
                          <span
                            className={style.nameText}
                            style={{ color: theme.headerClr }}
                          >{`${
                            localStorage.getItem("userName")
                              ? localStorage.getItem("userName")
                              : ""
                          }`}</span>
                          <span className={style.karma}>
                            <span>1 karma</span>
                          </span>
                        </span>
                      </span>
                      <span
                        className={style.btmArrow}
                        style={{ color: theme.arrowClr }}
                      >
                        <KeyboardArrowDownIcon />
                      </span>
                    </span>
                  </button>
                </Tooltip>
                {userDropdown && (
                  <div
                    className={style.userMenuMain}
                    style={{
                      backgroundColor: theme.headerBg,
                      borderColor: theme.headerBorderClr,
                      color: theme.headerClr,
                    }}
                    ref={userRef}
                  >
                    <div>
                      <div className={style.myStuffMain}>
                        <span className={style.myStuffSection}>
                          <span className={style.myStuffIconMain}>
                            <AccountCircleOutlinedIcon />
                          </span>
                          <span className={style.myStuffTxt}>My Stuff</span>
                        </span>
                      </div>
                      <div
                        className={style.myStuffContent}
                        style={{ borderColor: theme.headerBorderClr }}
                      >
                        <button
                          className={style.statusMain}
                          style={{ color: theme.headerClr }}
                        >
                          <span
                            className={style.onlineStatus}
                            style={{ color: theme.headerClr }}
                          >
                            Online Status
                          </span>
                          <span>
                            <IOSSwitch
                              value={onlineStatus}
                              onChange={handleOnlineStatus}
                            />
                          </span>
                        </button>
                        <span className={style.userMain}>
                          <span>Profile</span>
                        </span>
                      </div>
                      <div className={style.viewOptionsMain}>
                        <span className={style.myStuffSection}>
                          <span className={style.myStuffIconMain}>
                            <RemoveRedEyeOutlinedIcon />
                          </span>
                          <span className={style.myStuffTxt}>View Options</span>
                        </span>
                      </div>
                      <div
                        className={style.viewOptionsContent}
                        style={{ borderColor: theme.headerBorderClr }}
                      >
                        <button
                          className={style.viewOptionBtn}
                          style={{ color: theme.headerClr }}
                        >
                          <span>Dark Mode</span>
                          <span>
                            <IOSSwitch
                              checked={isDarkMode}
                              onChange={handleThemes}
                            />
                          </span>
                        </button>
                      </div>
                      <button
                        className={style.logoutMain}
                        style={{ color: theme.headerClr }}
                        onClick={(e) => handleLogoutBtnClick(e)}
                      >
                        <span className={style.logoutContent}>
                          <span className={style.logoutIconMain}>
                            <span className={style.logutIcon}>
                              <LogoutOutlinedIcon />
                            </span>
                          </span>
                          <span className={style.logoutTxt}>Log Out</span>
                        </span>
                      </button>
                      <div
                        className={style.copyrightMain}
                        style={{ color: theme.arrowClr }}
                      >
                        <span className={style.copyrightTxt}>
                          Reddit, Inc. © 2024. All rights reserved.
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default SubmitPageHeaderComp;

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
