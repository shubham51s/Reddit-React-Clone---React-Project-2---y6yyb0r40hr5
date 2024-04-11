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

function SubmitPageHeaderComp() {
  const { theme, handleThemeChange, isDarkMode, setIsDarkMode } =
    useContext(ThemeContext);
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);

  const userRef = useRef(null);
  const profileRef = useRef(null);
  const createPostRef = useRef(null);
  const createPostListRef = useRef(null);
  const [userInput, setUserInput] = useState("");
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  const [userDropdown, setUserDropdown] = useState(false);
  const [createPostDropdown, setCreatePostDropdown] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(false);

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

  // need to add use router hook later when user logged out it should naviagate to home page
  const handleLogoutBtnClick = (e) => {
    e.stopPropagation();
    localStorage.removeItem("userEmail");
    localStorage.removeItem("authToken");
    localStorage.removeItem("userName");
    setIsLoggedIn(false);
  };

  useEffect(() => {
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

    document.body.addEventListener("click", handleClickOutside);
    document.body.addEventListener("click", handleUserClick);
    document.body.addEventListener("click", handleCreatePostClick);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("click", handleUserClick);
      document.removeEventListener("click", handleCreatePostClick);
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
          <span className={style.logoMain}>
            <RedditIcon style={{ fontSize: "34px", color: "orangered" }} />
            <span className={style.logoTxt} style={{ color: theme.redditLogo }}>
              reddit
            </span>
          </span>
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
          {/* below input */}
          <div className={style.redditSearchMain}>
            <div className={style.searchContent}>
              <div className={style.searchInnerMain}>
                <div className={style.searchInputMain}>
                  {/* if required need to add another div here */}
                  <div
                    className={style.searchBarMain}
                    style={{
                      backgroundColor: showResults
                        ? theme.bgColor
                        : theme.activeNavBg,
                    }}
                  >
                    <div className={style.isolate}>
                      <form
                        className={style.inputForm}
                        style={{
                          color: theme.navTabColor,
                          backgroundColor: theme.activeNavBg,
                        }}
                        autoComplete="off"
                      >
                        <div className={style.searchInner}>
                          <label className={style.searchLabel}>
                            <div className={style.labelContainer}>
                              <span className={style.leadingIcon}>
                                <SearchIcon style={{ fontSize: "20px" }} />
                              </span>
                              <span
                                className={style.inputContainer}
                                ref={inputRef}
                              >
                                <input
                                  type="text"
                                  className={style.inputSearch}
                                  style={{
                                    color: theme.navTabColor,
                                  }}
                                  onChange={(e) => handleUserSearch(e)}
                                  value={userInput}
                                  onClick={handleInputClick}
                                />
                              </span>
                              {userInput.length >= 1 && (
                                <span
                                  className={style.clearIcon}
                                  onClick={() => setUserInput("")}
                                  style={{ cursor: "pointer" }}
                                >
                                  <ClearIcon
                                    style={{
                                      fontSize: "20px",
                                    }}
                                  />
                                </span>
                              )}
                            </div>
                          </label>
                        </div>
                      </form>
                    </div>
                    {/* below is onclick */}
                    {showResults && (
                      <div
                        className={style.searchResultMain}
                        style={{ backgroundColor: theme.bgColor }}
                      >
                        {!userInput && (
                          <div
                            className={style.trendingTxt}
                            style={{ color: theme.popularCommunitiesTxt }}
                          >
                            <TrendingUpIcon
                              style={{ fontSize: "20px", paddingRight: "5px" }}
                            />
                            TRENDING TODAY
                          </div>
                        )}

                        {/* trending result */}
                        {!userInput && (
                          <ul className={style.trendingResultMain}>
                            {/* map below */}
                            <li className={style.tredingList}>
                              <span
                                className={style.tredingListLink}
                                style={{ color: theme.navTabColor }}
                              >
                                <span className={style.trendingListLeft}>
                                  <span className={style.tredingListLeftInner}>
                                    <span className={style.trendingListHeading}>
                                      <span
                                        className={style.trendingHeadingMain}
                                      >
                                        <span
                                          className={style.trendingHeading}
                                          style={{
                                            color: theme.communityTxtClr,
                                          }}
                                          //   heading list here
                                        >{`April Fool's Day`}</span>
                                      </span>
                                    </span>
                                    <span
                                      className={style.trendingListContent}
                                      style={{
                                        color: theme.popularCommunitiesTxt,
                                      }}
                                    >
                                      <span
                                        className={
                                          style.trendingListContentMain
                                        }
                                        style={{ color: theme.communityTxtClr }}
                                      >
                                        <span className={style.trendingListTxt}>
                                          {/* need to add community text later */}
                                          {`Gmail revolutionized email 20 years ago. People thought it was Google's April Fool's Day joke.`}
                                        </span>
                                        <div
                                          className={
                                            style.trendingListCommunity
                                          }
                                          style={{
                                            color: theme.popularCommunitiesTxt,
                                          }}
                                        >
                                          <div
                                            className={
                                              style.trendingCommunityImg
                                            }
                                          >
                                            <div className={style.loaded}>
                                              <img
                                                className={
                                                  style.trendingListImg
                                                }
                                                // community image here
                                                src={`https://b.thumbs.redditmedia.com/J_fCwTYJkoM-way-eaOHv8AOHoF_jNXNqOvPrQ7bINY.png`}
                                                alt="name"
                                              />
                                            </div>
                                          </div>
                                          {/* need to add communit list here */}
                                          <span>{`r/technology and more`}</span>
                                        </div>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                                <span className={style.trendingListRight}>
                                  <span className={style.trendingImgMain}>
                                    <div className={style.trendingImgContent}>
                                      <div className={style.loadedImg}>
                                        <img
                                          className={style.trendingImg}
                                          //   need to add community image here
                                          src={`https://b.thumbs.redditmedia.com/YjroOtRK0Tb9jn_KjO7JNj73Kpc9c352UI_Q5YsVyWk.jpg`}
                                          alt={`image`}
                                        />
                                      </div>
                                    </div>
                                  </span>
                                </span>
                              </span>
                            </li>
                          </ul>
                        )}

                        {/* user search result */}
                        {userInput && (
                          <ul className={style.userSearchResult}>
                            <div
                              className={style.communitiesTxt}
                              style={{ color: theme.communityTxtClr }}
                            >
                              Communities
                            </div>
                            <li className={style.userInputList}>
                              <span
                                className={style.userInputLink}
                                style={{ color: theme.navTabColor }}
                              >
                                <span className={style.userInputContent}>
                                  <span className={style.communityLogoMain}>
                                    <span
                                      className={style.communityLogoContent}
                                    >
                                      <div
                                        className={style.communityProfileMain}
                                      >
                                        <div className={style.profileLoaded}>
                                          <img
                                            className={style.communityProfile}
                                            // need to profile image later
                                            src={`https://a.thumbs.redditmedia.com/8rHqHJ86uZ8iHfejG2zZbLX9ThOAZUzCVOwgms0KCq4.png`}
                                            alt={`alt`}
                                          />
                                        </div>
                                      </div>
                                    </span>
                                  </span>
                                  <span className={style.aboutCommunityMain}>
                                    <span className={style.communityNameMain}>
                                      <span
                                        className={style.communityName}
                                        style={{ color: theme.communityTxtClr }}
                                      >
                                        r/books
                                      </span>
                                    </span>
                                    <span
                                      className={style.membersMain}
                                      style={{
                                        color: theme.popularCommunitiesTxt,
                                      }}
                                    >
                                      <span
                                        className={style.membersTxtMain}
                                        style={{
                                          color: theme.popularCommunitiesTxt,
                                        }}
                                      >
                                        {/* need to add members later */}
                                        <span>{`24M`} members</span>
                                      </span>
                                    </span>
                                  </span>
                                </span>
                                <span className={style.userShrink0}></span>
                              </span>
                            </li>
                          </ul>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={style.headerRightContent}>
          <div className={style.popularIconMain}>
            <div className={style.popularIconContent}>
              <span className={style.popularTabLink}>
                <span className={style.popularIcon}>
                  <OutboundOutlinedIcon />
                </span>
              </span>
            </div>
          </div>
          <div className={style.rightSideMain}>
            <div className={style.rightSideContent}>
              <div className={style.changeUsernameTooltip}>
                <span className={style.messageIconMain}>
                  <span className={style.messageLink}>
                    <span className={style.messageIcon}>
                      <ChatBubbleOutlineOutlinedIcon />
                    </span>
                  </span>
                </span>
                <span className={style.notificationMain}>
                  <button className={style.notificationBtn}>
                    <div className={style.notificationBtnInner}>
                      <span className={style.notificationIcon}>
                        <NotificationsOutlinedIcon />
                      </span>
                    </div>
                  </button>
                </span>
                <span className={style.createIconMain}>
                  <button className={style.createIconBtn}>
                    <span className={style.createIcon}>
                      <AddIcon />
                    </span>
                  </button>
                </span>
                <span className={style.advertiseMain}>
                  <span className={style.adLink}>
                    <span className={style.adIcon}>
                      <AdsClickOutlinedIcon />
                    </span>
                  </span>
                </span>
                <span className={style.emptyIcon}></span>
              </div>
              <div>
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
