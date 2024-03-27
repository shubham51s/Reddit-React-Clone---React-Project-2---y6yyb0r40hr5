import React from "react";
import style from "./homerightocomp.module.css";
import Link from "next/link";
import PopularComunitiesComp from "./popularCommunitiesComp";

function HomeRightComp({ theme, popularCommunities }) {
  return (
    <div className={style.mainContainer}>
      <div className={style.mainContent}>
        <main className={style.homeContent}></main>
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
