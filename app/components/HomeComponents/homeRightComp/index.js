import React from "react";
import style from "./homerightocomp.module.css";
import Link from "next/link";
import PopularComunitiesComp from "./popularCommunitiesComp";

function HomeRightComp({ theme, popularCommunities }) {
  return (
    <div className={style.mainContainer}>
      <div className={style.mainContent}>
        <main className={style.homeContent}>
          <div className={style.sortMain}>
            <div className={style.sortContent}>
              <div className={style.flexItmCtr}>
                {/* selected item */}
                {/* need to add selected div here */}
                <div className={style.selectedItem}>{`Hot`}</div>
                <div className={style.dropdownItems}>
                  <li className={style.sortList}></li>
                  <li></li>
                  <li></li>
                  <li></li>
                </div>
              </div>
              {/* need to card sort here */}
            </div>
          </div>
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
