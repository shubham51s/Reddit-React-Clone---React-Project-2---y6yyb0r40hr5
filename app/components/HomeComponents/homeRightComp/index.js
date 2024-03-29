import React, { startTransition, useState } from "react";
import style from "./homerightocomp.module.css";
import Link from "next/link";
import PopularComunitiesComp from "./popularCommunitiesComp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ViewAgendaOutlinedIcon from "@mui/icons-material/ViewAgendaOutlined";
import SortComp from "../sortContainer";
import JoinBtnComp from "./joinButton";
import CommentsComp from "./voteNcomments";

function HomeRightComp({ theme, popularCommunities, postResult }) {
  console.log("Post data: ", postResult);
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
          <div>
            <div className={style.flexColmn}>
              {/* card list */}
              <article className={style.widthFull}>
                {/* list here maybe */}
                <div
                  className={style.postListMain}
                  style={{ backgroundColor: theme.bgColor }}
                >
                  {/* <CommentsComp theme={theme} /> */}
                  <span className={style.creditBar}>
                    <span className={style.creditBarLeft}>
                      <span className={style.aboutCommunity}>
                        <span
                          className={style.aboutCommunityContent}
                          style={{ color: theme.communityTxtClr }}
                        >
                          <div className={style.communityImgMain}>
                            <div className={style.communityImgContent}>
                              <div className={style.imgLogo}>
                                <img
                                  className={style.communityImg}
                                  // need to add community img later
                                  src={`https://styles.redditmedia.com/t5_2rnjo/styles/communityIcon_sn55eqgnhpw61.jpg?format=pjpg&s=29fe9bb3e92caba7c4551f50b5e04a578e8a7900`}
                                  alt={`r/ipl icon`}
                                />
                              </div>
                            </div>
                          </div>
                          <span className={style.communityName}>
                            {/* need to add name later */}
                            {`r/ipl`}
                          </span>
                        </span>
                        {/* need to add on hover content here */}
                        {/* <div></div> */}
                      </span>
                      <span
                        className={style.dot}
                        style={{ color: theme.popularCommunitiesTxt }}
                      >
                        •
                      </span>
                      <span
                        className={style.postTimeMain}
                        style={{ color: theme.popularCommunitiesTxt }}
                      >
                        {/* need to add date later */}
                        <div>3 days ago</div>
                      </span>
                    </span>
                    <span className={style.creditBarRight}>
                      <JoinBtnComp />
                    </span>
                  </span>
                  <span
                    className={style.postTitle}
                    style={{ color: theme.popularCommunitiesTxt }}
                    //  need to add heading later
                  >{`Blud is the weakest batsman in the team`}</span>
                  <div
                    className={style.postMediaMain}
                    style={{ backgroundColor: theme.bgColor }}
                  >
                    <div
                      className={style.imgBorder}
                      style={{ borderColor: theme.sortBtmBorderClr }}
                    ></div>
                    <div className={style.postMediaContent}>
                      <div className={style.imgContents}>
                        <div className={style.mediaLightBox}>
                          <img
                            className={style.mediaImg}
                            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pollock_to_Hussey.jpg/1200px-Pollock_to_Hussey.jpg`}
                          />
                          <img
                            className={style.mediaImgMain}
                            src={`https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Pollock_to_Hussey.jpg/1200px-Pollock_to_Hussey.jpg`}
                            alt={`alt="r/ipl - Blud is the weakest batsman in the team"`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CommentsComp theme={theme} />
                </div>
                <hr
                  className={style.cardBtmBorder}
                  style={{ borderBottomColor: theme.sortBtmBorderClr }}
                />
              </article>
            </div>
          </div>
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
