import React, { useState } from "react";
import style from "./homerightocomp.module.css";
import Link from "next/link";
import PopularComunitiesComp from "./popularCommunitiesComp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import SortComp from "../sortContainer";

function HomeRightComp({ theme, popularCommunities }) {
  return (
    <div className={style.mainContainer}>
      <div className={style.mainContent}>
        <main className={style.homeContent}>
          <SortComp theme={theme} />
          <hr
            className={style.sortBtmBorder}
            style={{ borderBottomColor: theme.sortBtmBorderClr }}
          ></hr>
          {/* card */}
          <div></div>
        </main>
        {/* below div is optional need to show only when user not logged in */}
        <PopularComunitiesComp
          theme={theme}
          popularCommunities={popularCommunities}
        />
      </div>
    </div>
  );
}

export default HomeRightComp;
