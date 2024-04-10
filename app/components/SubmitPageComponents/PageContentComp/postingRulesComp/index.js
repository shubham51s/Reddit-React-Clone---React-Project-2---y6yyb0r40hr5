"use client";
import React, { useContext } from "react";
import style from "./postingrules.module.css";
import { TheaterComedy } from "@mui/icons-material";
import ThemeContext from "@/app/contexts/ThemeContext";
import ChecklistIcon from "@mui/icons-material/Checklist";

function PostRulesComp() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={style.mainContainer}>
      <div className={style.mainContainerInner}>
        <div
          className={style.mainContent}
          style={{ backgroundColor: theme.policyBg }}
        >
          <div
            className={style.rulesHeaderMain}
            style={{
              borderColor: theme.headerBorderClr,
              color: theme.headerClr,
            }}
          >
            <ChecklistIcon />
            Posting to Reddit
          </div>
          <ol className={style.rulesListMain}>
            {RulesList.map((item) => (
              <li
                key={item.id}
                className={style.rulesList}
                style={{
                  borderColor: theme.headerBorderClr,
                  color: theme.headerClr,
                }}
              >
                {item.name}
              </li>
            ))}
          </ol>
        </div>
        <div className={style.gap}></div>
        <div
          className={style.policyContainer}
          style={{ color: theme.policyClr }}
        >
          Please be mindful of reddit's{" "}
          <span style={{ color: theme.policyLinkClr }}>content policy</span> and
          practice good{" "}
          <span style={{ color: theme.policyLinkClr }}>reddiquette</span>.
        </div>
      </div>
    </div>
  );
}

export default PostRulesComp;

const RulesList = [
  {
    id: 1,
    name: "Remember the human",
  },
  {
    id: 2,
    name: "Behave like you would in real life",
  },
  {
    id: 3,
    name: "Look for the original source of content",
  },
  {
    id: 4,
    name: "Search for duplicates before posting",
  },
  {
    id: 5,
    name: "Read the community’s rules",
  },
];
