import React, { useContext, useState } from "react";
import style from "./sortcomponent.module.css";
import Link from "next/link";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import ThemeContext from "@/app/contexts/ThemeContext";

function SortComp() {
  const { theme, setTheme } = useContext(ThemeContext);

  const [sortValue, setSortValue] = useState(1);
  const [cardValue, setCardValue] = useState(1);

  const handleSorting = (val) => {
    setSortValue(val);
  };

  const handleCardType = (val) => {
    setCardValue(val);
  };

  return (
    <div className={style.sortContainer}>
      <div>
        <div className={style.sortContent}>
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
                Hot
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
                Best
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
