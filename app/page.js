"use client";
import { useEffect, useState } from "react";
import HomeLeftComp from "./components/HomeComponents/homeLeftComp";
import HomeRightComp from "./components/HomeComponents/homeRightComp";
import LoginNavComp from "./components/NavBar/LoggedOut";
import style from "./homepage.module.css";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState({});
  const [popularCommunities, setPopularCommunities] = useState([]);
  const themeData = {
    light: {
      currTheme: "Light",
      bgColor: "#ffffff",
      borderColor: "#00000033",
      color: "#1a1a1b",
      navTabColor: "#0F1A1C",
      activeNavClr: "#000000",
      activeNavBg: "#EAEDEF",
      popularCommunitiesBg: "#F9FAFA",
      showMoreBtnHoverBg: "#becfcf",
      popularCommunitiesTxt: "#576F76",
      communityTxtClr: "#2A3C42",
      sortBtmBorderClr: "#0000001a",
    },
    dark: {
      currTheme: "Dark",
      bgColor: "#0B1416",
      borderColor: "#00000033",
      color: "#d7dadc",
      navTabColor: "#F2F4F5",
      activeNavClr: "#ffffff",
      activeNavBg: "#1A282D",
      popularCommunitiesBg: "#04090A",
      showMoreBtnHoverBg: "#142f34",
      popularCommunitiesTxt: "#82959B",
      communityTxtClr: "#B8C5C9",
      sortBtmBorderClr: "#ffffff1a",
    },
  };

  const fetchPopularCommunities = async () => {
    try {
      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/channel",
        {
          headers: {
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      console.log("result: ", result);
      setPopularCommunities(result.data);
    } catch {
      console.log(err.message ? err.message : err);
    }
  };

  useEffect(() => {
    setTheme(isDark ? themeData.dark : themeData.light), [isDark];
    fetchPopularCommunities();
  }, []);

  console.log("communities: ", popularCommunities);

  return (
    <>
      <LoginNavComp theme={theme} />
      <div className={style.homePageContainer}>
        <HomeRightComp theme={theme} popularCommunities={popularCommunities} />
        <HomeLeftComp theme={theme} />
      </div>
    </>
  );
}
