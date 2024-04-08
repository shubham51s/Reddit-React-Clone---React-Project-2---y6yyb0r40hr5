"use client";
import React, { useContext, useEffect, useState } from "react";
import style from "./commentsrightcomp.module.css";
import { TheaterComedy } from "@mui/icons-material";
import ThemeContext from "@/app/contexts/ThemeContext";
import RulesComp from "./rulesComponent";
import UserContext from "@/app/contexts/LoginContext";

function CommentRightComp() {
  const { isLoggedIn } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [isJoined, setIsJoined] = useState(false);
  const [userData, setUserData] = useState([]);

  const fetchUser = async (userId, token) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/channel/${userId}`,
        {
          headers: {
            Authorization: token,
            projectID: "y6yyb0r40hr5",
          },
        }
      );

      if (!resp.ok) return;

      const result = await resp.json();
      setUserData(result.data);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleJoinBtn = () => {
    setIsJoined(!isJoined);
  };

  useEffect(() => {
    if (isLoggedIn && sessionStorage.getItem("userChannelId")) {
      fetchUser(
        sessionStorage.getItem("userChannelId"),
        localStorage.getItem("authToken")
      );
    }
  }, []);

  return (
    <div className={style.mainContainer}>
      <div>
        <div
          className={style.communityInformation}
          style={{ backgroundColor: theme.commentBg }}
        >
          <div className={style.padding}>
            {isLoggedIn && (
              <div className={style.aboutCommunityContainer}>
                <div className={style.aboutCommunityMain}>
                  <div className={style.communityHeader}>
                    <span className={style.communityHeadingMain}>
                      <span className={style.communityLink}>
                        <div
                          className={style.prefixedName}
                          style={{ textTransform: "lowercase" }}
                        >
                          {"r/"}
                          {userData.name}
                        </div>
                      </span>
                    </span>
                    <div className={style.joinBtnMain}>
                      <button
                        className={style.joinBtn}
                        onClick={handleJoinBtn}
                      >{`${isJoined ? "Joined" : "Join"}`}</button>
                    </div>
                  </div>
                  <div className={style.communityDetailsMain}>
                    <h2
                      className={style.communityHeading}
                      style={{
                        color: theme.communityHeading,
                      }}
                    >
                      {"r/"}
                      {userData.name}
                    </h2>
                    <div
                      className={style.description}
                      style={{ color: theme.descriptionClr }}
                    >
                      {userData.description}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isLoggedIn && (
              <hr
                className={style.btmBorder}
                style={{ borderColor: theme.sortBtmBorderClr }}
              />
            )}
            {isLoggedIn && (
              <div
                className={style.userFlairContainer}
                style={{ color: theme.rulesClr }}
              >
                <div className={style.userFlairTxtMain}>
                  <h2 className={style.nameHeading}>
                    <div>User flair</div>
                  </h2>
                </div>
                <div className={style.userNameMain}>
                  <div className={style.nameInner}>
                    <div className={style.userProfileMain}>
                      <div className={style.profileContent}>
                        <div className={style.profileInner}>
                          <div className={style.loaded}>
                            <img
                              className={style.profilePicture}
                              src="https://www.redditstatic.com/avatars/defaults/v2/avatar_default_0.png"
                              alt={`${localStorage.getItem("userName")}`}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className={style.userNameContent}>
                      <div
                        className={style.authorUsername}
                        style={{ color: theme.descriptionClr }}
                      >{`${localStorage.getItem("userName")}`}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isLoggedIn && (
              <hr
                className={style.btmBorder}
                style={{ borderColor: theme.sortBtmBorderClr }}
              />
            )}

            <div
              className={style.rulesContainer}
              style={{ color: theme.rulesClr }}
            >
              <div className={style.rulesHeading}>
                <h2 className={style.rulesHeadingTxt}>
                  <div> Rules</div>
                </h2>
              </div>
              {RulesData.map((item) => (
                <RulesComp
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CommentRightComp;

const RulesData = [
  {
    id: 1,
    title: "Title and Language",
    description: [
      {
        no: 1.1,
        details:
          "Titles should be informative, accurately reflecting the content of the post, and providing enough context for community. Avoid vague or misleading titles.",
      },
      {
        no: 1.2,
        details:
          "Avoid using clickbait titles. Editorialize title if it's baity at source.",
      },
      {
        no: 1.3,
        details:
          "For serious discussions, use the [S] tag in the title to indicate the topic's gravity.",
      },
      {
        no: 1.4,
        details:
          "Emojis or Hashtags in titles are not permitted as they can be distracting. Ensure that appropriate flairs are set for all community submissions.",
      },
    ],
  },
  {
    id: 2,
    title: "Content Quality",
    description: [
      {
        no: 2.1,
        details:
          "When creating text, image, or video posts, include sufficient detail or context to encourage meaningful audience participation and discussion. Low-effort posts with minimal content or broad context or without verified source may be removed",
      },
      {
        no: 2.2,
        details: "Non-OC images are not welcome in community.",
      },
    ],
  },
  {
    id: 3,
    title: "Language and Translation",
    description: [
      {
        no: 3.1,
        details:
          "All community post titles must be in English to ensure consistency and clarity. Titles which cannot be in English because of their very nature, will need to have necessary English translation provided either in title or comments.",
      },
      {
        no: 3.2,
        details:
          "Hindi or Hinglish is allowed in the post body or comments for community.",
      },
    ],
  },
  {
    id: 4,
    title: "No Relationship Posts",
    description: [
      {
        no: 4.1,
        details:
          "Personal relationship-related discussions inlcuding romantic, familial or friends are not permitted in community. Please redirect such discussions to r/RelationshipIndia, a subreddit specifically dedicated to that topic.",
      },
    ],
  },
  {
    id: 5,
    title:
      "No Promos/Referrals/Ticket Selling or Self Promotion or Illegal Activity",
    description: [
      {
        no: 5.1,
        details:
          "Posts related to giveaways, promo/referral codes, event tickets, illegal buying and selling of substances/services are not allowed in community unless verified or authorized by the moderators.",
      },
      {
        no: 5.2,
        details:
          "Posts related to Self Promotions will only be allowed for regular members of r/Delhi and only in the ratio of 1:10 with respect to their participation in community.",
      },
    ],
  },
  {
    id: 6,
    title: "No Sexism, Misogyny or Incel Commentary",
    description: [
      {
        no: 6.1,
        details:
          "Please respect the environment and avoid content that objectifies or solicits others. Sexism, misogyny and incel behaviour is not tolerated here.",
      },
    ],
  },
  {
    id: 7,
    title: "Personal Info and Doxxing",
    description: [
      {
        no: 7.1,
        details:
          "Posting Personally Identifiable Information (PII) is not allowed in community. Users who break this rule will be banned.",
      },
      {
        no: 7.2,
        details:
          "Conversations surrounding the topic are still allowed if they are in public interest, but without making the names, social media or communication information of the perpetrators public.",
      },
      {
        no: 7.3,
        details:
          "Exceptions may apply in cases of verified fundraising efforts such as Milaap, but self-discretion and self-moderation should be applied in this respect.",
      },
    ],
  },
  {
    id: 8,
    title: "Respect and Behavior",
    description: [
      {
        no: 8.1,
        details:
          "Hate speech, racism, sexism, homophobia, religious intolerance, and trolling will not be tolerated in r/Delhi. Posts and comments targeting other users, encouraging vote brigading, or encouraging following users across Reddit or social media are also prohibited.",
      },
      {
        no: 8.2,
        details:
          "Remember human. Avoid using derogatory language, offensive content, or harassing others. Constructive criticism and debate are encouraged, but maintain respect for one another.",
      },
    ],
  },
  {
    id: 9,
    title: "Content Verification",
    description: [
      {
        no: 9.1,
        details:
          "We discourage the posting of unverified or viral content in r/Delhi. Share content that is accurate and from reliable sources. Verify the authenticity of the content before posting.",
      },
      {
        no: 9.2,
        details:
          "Relevant Viral content can be posted if it is accompanied by a news article or report from a verified news media.",
      },
    ],
  },
  {
    id: 10,
    title: "Relevance to Community",
    description: [
      {
        no: 10.1,
        details:
          "Ensure that posts are relevant to community. Inappropriate cases include posts about other cities/states, broad topics with no specific answer, topics not specific to community, illegal activities, NSFW/gore content, witch-hunting or targeting community users, low-effort shitposting, and R4R posts.",
      },
    ],
  },
  {
    id: 11,
    title: "No thirsty content",
    description: [
      {
        no: 11.1,
        details:
          "Thirsty Posts, comments, or direct messages seeking dating partners, or sexual partners or sex-focussed discussions are strictly prohibited in community.",
      },
    ],
  },
];
