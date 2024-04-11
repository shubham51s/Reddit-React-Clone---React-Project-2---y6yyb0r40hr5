"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../loggedoutnav.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

function NavSearchComp() {
  const { theme } = useContext(ThemeContext);
  const [userInput, setUserInput] = useState("");
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);

  const handleUserSearch = (e) => {
    setUserInput(e.target.value);
  };

  const handleInputClick = () => {
    setShowResults(true);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowResults(false);
      }
    };

    document.body.addEventListener("click", handleClickOutside);

    return document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={style.redditSearchMain}>
      <div className={style.searchContent}>
        <div className={style.searchInnerMain}>
          <div className={style.searchInputMain}>
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
                        <span className={style.inputContainer} ref={inputRef}>
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
                                <span className={style.trendingHeadingMain}>
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
                                  className={style.trendingListContentMain}
                                  style={{ color: theme.communityTxtClr }}
                                >
                                  <span className={style.trendingListTxt}>
                                    {/* need to add community text later */}
                                    {`Gmail revolutionized email 20 years ago. People thought it was Google's April Fool's Day joke.`}
                                  </span>
                                  <div
                                    className={style.trendingListCommunity}
                                    style={{
                                      color: theme.popularCommunitiesTxt,
                                    }}
                                  >
                                    <div className={style.trendingCommunityImg}>
                                      <div className={style.loaded}>
                                        <img
                                          className={style.trendingListImg}
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
                              <span className={style.communityLogoContent}>
                                <div className={style.communityProfileMain}>
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
  );
}

export default NavSearchComp;
