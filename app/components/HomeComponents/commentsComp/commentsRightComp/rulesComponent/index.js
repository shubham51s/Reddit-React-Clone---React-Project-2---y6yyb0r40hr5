"use client";
import React, { useContext, useState } from "react";
import style from "./rulescomponent.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function RulesComp({ id, title, description }) {
  const { theme } = useContext(ThemeContext);
  const [showContent, setShowContent] = useState(false);

  return (
    <div className={style.rulesContent}>
      <div className={style.rulesList} style={{ color: theme.descriptionClr }}>
        <div className={style.rulesTitleMain}>
          <li className={style.rulesHeadingList}>
            <div
              className={style.rulesHeadingContent}
              onClick={() => setShowContent(!showContent)}
            >
              <span className={style.rulesTitleLeft}>
                <span className={style.serialMain}>
                  <span
                    className={style.serialNo}
                    style={{ color: theme.descriptionClr }}
                  >
                    {id}
                  </span>
                </span>
                <span className={style.rulesTitle}>
                  <span className={style.txt14}>
                    <span>
                      <h2
                        className={style.ruleMainTxt}
                        style={{ color: theme.descriptionClr }}
                      >
                        {title}
                      </h2>
                    </span>
                  </span>
                </span>
              </span>
              <span className={style.rulesTitleRight}>
                <span className={style.iconMain}>
                  {showContent && <KeyboardArrowUpIcon />}
                  {!showContent && <KeyboardArrowDownIcon />}
                </span>
              </span>
            </div>
          </li>
        </div>
        {showContent && (
          <div className={style.rulesDetails}>
            <div className={style.detailsContent}>
              <div className={style.translatableTxt}>
                <div className={style.rulesContentMain}>
                  {description.map((item) => (
                    <p key={item.no}>
                      <strong>
                        {item.no}
                        {"  "}
                      </strong>
                      {item.details}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RulesComp;
