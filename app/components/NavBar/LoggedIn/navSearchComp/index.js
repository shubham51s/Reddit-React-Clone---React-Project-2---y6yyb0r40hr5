"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "../loggedoutnav.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import { StyleOutlined } from "@mui/icons-material";

function NavSearchComp() {
  const { theme } = useContext(ThemeContext);
  const [userInput, setUserInput] = useState("");
  const [isInputClicked, setIsInputClicked] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const inputRef = useRef(null);
  const contentRef = useRef(null);
  const [searchResults, setSearchResult] = useState([]);
  const [trendingResults, setTrendingResults] = useState([]);

  const fetchInputResult = async (input) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post?search={"content":"${input}"}`,
        {
          headers: {
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      setSearchResult(result.data);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const fetchTrendingResult = async () => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post`,
        {
          headers: {
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      setTrendingResults(result.data);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleUserSearch = (e) => {
    setUserInput(e.target.value);
    fetchInputResult(e.target.value);
  };

  const handleInputClick = (e) => {
    setShowResults(true);
  };

  useEffect(() => {
    fetchTrendingResult();
    const handleClickOutside = (e) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
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
                  ref={contentRef}
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
                      {trendingResults.length >= 1 &&
                        trendingResults.map((item) => (
                          <li className={style.tredingList} key={item._id}>
                            <span
                              className={style.tredingListLink}
                              style={{ color: theme.navTabColor }}
                            >
                              <span className={style.trendingListLeft}>
                                <span className={style.tredingListLeftInner}>
                                  <div
                                    className={style.trendingListCommunity}
                                    style={{
                                      color: theme.popularCommunitiesTxt,
                                    }}
                                  >
                                    <div className={style.userCenter}>
                                      <div
                                        className={style.trendingCommunityImg}
                                      >
                                        <div className={style.loaded}>
                                          <img
                                            className={style.trendingListImg}
                                            src={item.author.profileImage}
                                          />
                                        </div>
                                      </div>
                                      <span>{item.author.name}</span>
                                    </div>
                                  </div>
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
                                        {item.content}
                                      </span>
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
                                        src={item.images[0]}
                                        alt={`image`}
                                      />
                                    </div>
                                  </div>
                                </span>
                              </span>
                            </span>
                          </li>
                        ))}
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
                      {searchResults.length >= 1 &&
                        searchResults.map((item) => (
                          <li className={style.tredingList} key={item._id}>
                            <span
                              className={style.tredingListLink}
                              style={{ color: theme.navTabColor }}
                            >
                              <span className={style.trendingListLeft}>
                                <span className={style.tredingListLeftInner}>
                                  <div
                                    className={style.trendingListCommunity}
                                    style={{
                                      color: theme.popularCommunitiesTxt,
                                    }}
                                  >
                                    <div className={style.userCenter}>
                                      <div
                                        className={style.trendingCommunityImg}
                                      >
                                        <div className={style.loaded}>
                                          <img
                                            className={style.trendingListImg}
                                            src={item.author.profileImage}
                                          />
                                        </div>
                                      </div>
                                      <span>{item.author.name}</span>
                                    </div>
                                  </div>
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
                                        {item.content}
                                      </span>
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
                                        src={item.images[0]}
                                        alt={`image`}
                                      />
                                    </div>
                                  </div>
                                </span>
                              </span>
                            </span>
                          </li>
                        ))}
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
