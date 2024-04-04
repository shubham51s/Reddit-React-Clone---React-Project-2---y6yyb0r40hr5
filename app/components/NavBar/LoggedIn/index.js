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

function LogoutNavComp() {
  const { theme, setTheme } = useContext(ThemeContext);
  const { setUserLoginModal } = useContext(UserContext);

  const [isDrawer, setIsDrawer] = useState(false);

  const [userInput, setUserInput] = useState("");
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  const [userProfile, setUserProfile] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleInputClick = () => {
    setShowResults(true);
  };

  const handleUserSearch = (e) => {
    setUserInput(e.target.value);
  };

  const LoggedInRightTabs = () => (
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
                  <AdsClickIcon />
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
                  <TextsmsOutlinedIcon />
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
              <span className={style.adevertizeIconMain}>
                <span className={style.createIconMain}>
                  <AddOutlinedIcon style={{ fontSize: "1.6rem" }} />
                </span>
                <span className={style.createTxt}>Create</span>
              </span>
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
                <span className={style.flex}>
                  <NotificationsNoneOutlinedIcon />
                </span>
              </span>
            </span>
          </span>
        </span>
      </div>
      <div className={style.userProfileMain}>
        <div className={style.disFlex}>
          <span
            className={style.userProfileContent}
            style={{ color: theme.activeNavClr }}
          >
            <button
              className={style.userProfileBtn}
              style={{ color: theme.navTabColor }}
            >
              <span className={style.profileBtnCtr}>
                <span className={style.flex}>
                  <span className={style.inlineFlex}>
                    <span className={style.profileBtnInner}>
                      <img
                        className={style.profileImg}
                        src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png"
                        alt="profile image"
                      />
                    </span>
                  </span>
                </span>
              </span>
            </button>
          </span>
          {/* below is onclick */}
          <div
            className={style.userProfileNav}
            style={{
              display: userProfile ? "block" : "none",
              backgroundColor: theme.bgColor,
            }}
          >
            <ul className={style.profileOptionsMain}>
              <li className={style.userProfileList}>
                <span
                  className={style.userProfileLink}
                  style={{ color: theme.navTabColor }}
                >
                  <span className={style.viewProfileMain}>
                    <span className={style.profileImgMain}>
                      <span className={style.text20}>
                        <div>
                          <span className={style.userProfileImgMain}>
                            <span className={style.userProfileImg}>
                              <img
                                className={style.showProfileImg}
                                src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png"
                                alt="user profile"
                              />
                            </span>
                          </span>
                        </div>
                      </span>
                    </span>
                    <span className={style.viewProfileContent}>
                      <span className={style.viewProfileTxt}>View Profile</span>
                      <span
                        className={style.userName}
                        style={{ color: theme.popularCommunitiesTxt }}
                      >
                        {"u/ProfessionalDrag3552"}
                      </span>
                    </span>
                  </span>
                  <span></span>
                </span>
              </li>
              <li className={style.darkModeMain}>
                <div
                  className={style.darkModeContent}
                  style={{ color: theme.navTabColor }}
                >
                  <span className={style.darkModeLeftMain}>
                    <span className={style.darkModeIconMain}>
                      <ModeNightOutlinedIcon />
                    </span>
                    <span className={style.darkModeTxtMain}>
                      <span className={style.text14}>Dark Mode</span>
                    </span>
                  </span>
                  <span className={style.darkModeToggleMain}>
                    <span className={style.darkModeToggleCtr}>
                      <div className={style.modeToggle}>
                        <span className={style.toggleIconMain}>
                          <span className={style.knob}>
                            <FormGroup>
                              <FormControlLabel
                                control={
                                  <IOSSwitch sx={{ m: 1 }} defaultChecked />
                                }
                              />
                            </FormGroup>
                          </span>
                        </span>
                      </div>
                    </span>
                  </span>
                </div>
              </li>
              <li className={style.darkModeMain}>
                <div
                  className={style.darkModeContent}
                  style={{ color: theme.navTabColor }}
                >
                  <span className={style.darkModeLeftMain}>
                    <span className={style.darkModeIconMain}>
                      <LogoutOutlinedIcon />
                    </span>
                    <span className={style.darkModeTxtMain}>
                      <span className={style.text14}>Log Out</span>
                    </span>
                  </span>
                  <span className={style.darkModeToggleMain}></span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const LoggedOutTabs = () => (
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
        <Link
          href="/"
          className={style.loginLink}
          onClick={() => setUserLoginModal(true)}
        >
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
                className={style.dotIconD}
                style={{ color: theme.navTabColor }}
              />
            </span>
          </span>
        </button>
        <div className={`${isDrawer ? style.userDrawerContent : style.hide}`}>
          {/* need to add drawer logic */}
          <ul style={{ color: theme.navTabColor }}>
            <li className={style.userDrawerList}>
              <span style={{ color: theme.navTabColor }}>
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
  );

  return (
    <div className={style.mainContainer}>
      <header
        className={style.headerContainer}
        style={{ backgroundColor: theme.bgColor, color: theme.color }}
      >
        <nav
          className={style.navContent}
          style={{ borderColor: theme.borderColor }}
        >
          <div className={style.navLeft}>
            <Link href="/" className={style.redditLogoLink}>
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
            </Link>
          </div>
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
          {/* here */}
          {userLoggedIn && <LoggedInRightTabs />}
          {!userLoggedIn && <LoggedOutTabs />}
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
