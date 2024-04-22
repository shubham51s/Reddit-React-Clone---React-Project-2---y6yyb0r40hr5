import React, { useContext, useState } from "react";
import style from "./sortcomponent.module.css";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import ThemeContext from "@/app/contexts/ThemeContext";
import Tooltip from "@mui/material/Tooltip";
import UserContext from "@/app/contexts/LoginContext";

function SortComp({ sortValue, setSortValue, postResult, setPostResult }) {
  const { theme, setTheme } = useContext(ThemeContext);
  const { isLoggedIn, isPopular } = useContext(UserContext);

  const [cardValue, setCardValue] = useState(1);

  const handleCardType = (val) => {
    setCardValue(val);
  };

  const fetchPosts = async () => {
    try {
      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/post?limit=100",
        {
          headers: {
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      if (isPopular) {
        const sortedData = result.data.sort(
          (a, b) => b.likeCount - a.likeCount
        );
        setPostResult(sortedData);
      } else {
        setPostResult(result.data);
      }
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const fetchLoggedInPosts = async (token) => {
    try {
      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/post?limit=100",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      if (isPopular) {
        const sortedData = result.data.sort(
          (a, b) => b.likeCount - a.likeCount
        );
        setPostResult(sortedData);
      } else {
        setPostResult(result.data);
      }
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleSorting = (val) => {
    setSortValue(val);
    if (val == 1) {
      if (isLoggedIn) {
        fetchLoggedInPosts(localStorage.getItem("authToken"));
      } else {
        fetchPosts();
      }
    } else if (val == 2) {
      postResult.sort((a, b) => b.dislikeCount - a.dislikeCount);
    } else if (val == 3) {
      postResult.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (val == 4) {
      postResult.sort((a, b) => b.likeCount - a.likeCount);
    }
  };

  return (
    <div className={style.sortContainer}>
      <div>
        <div className={style.sortContent}>
          <Tooltip title="View sort optinos">
            <div className={style.sortOptionContainer}>
              <select
                className={style.sortOptionsMain}
                style={{ color: theme.popularCommunitiesTxt }}
                onChange={(e) => handleSorting(e.target.value)}
              >
                <option
                  className={style.optionList}
                  style={{
                    color:
                      sortValue === 1 ? theme.activeNavClr : theme.navTabColor,
                    backgroundColor:
                      sortValue === 1 ? theme.activeNavBg : "transparent",
                  }}
                  value={1}
                >
                  Best
                </option>
                <option
                  className={style.optionList}
                  style={{
                    color:
                      sortValue === 2 ? theme.activeNavClr : theme.navTabColor,
                    backgroundColor:
                      sortValue === 2 ? theme.activeNavBg : "transparent",
                  }}
                  value={2}
                >
                  Hot
                </option>
                <option
                  className={style.optionList}
                  style={{
                    color:
                      sortValue === 3 ? theme.activeNavClr : theme.navTabColor,
                    backgroundColor:
                      sortValue === 3 ? theme.activeNavBg : "transparent",
                  }}
                  value={3}
                >
                  New
                </option>
                <option
                  className={style.optionList}
                  style={{
                    color:
                      sortValue === 4 ? theme.activeNavClr : theme.navTabColor,
                    backgroundColor:
                      sortValue === 4 ? theme.activeNavBg : "transparent",
                  }}
                  value={4}
                >
                  Top
                </option>
              </select>
            </div>
          </Tooltip>
          <div className={style.viewSortContainer}>
            {/* card view pending */}
            <select
              className={style.sortOptionsMain}
              style={{ color: theme.popularCommunitiesTxt }}
              onChange={(e) => handleCardType(e.target.value)}
            >
              <option
                className={style.optionList}
                style={{
                  color:
                    cardValue === 1 ? theme.activeNavClr : theme.navTabColor,
                  backgroundColor:
                    cardValue === 1 ? theme.activeNavBg : "transparent",
                }}
                value={1}
              >
                Card
              </option>
              <option
                className={style.optionList}
                style={{
                  color:
                    cardValue === 2 ? theme.activeNavClr : theme.navTabColor,
                  backgroundColor:
                    cardValue === 2 ? theme.activeNavBg : "transparent",
                }}
                value={2}
              >
                Compact
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SortComp;
