"use client";
import { useEffect, useState } from "react";
import HomeLeftComp from "./components/HomeComponents/homeLeftComp";
import HomeRightComp from "./components/HomeComponents/homeRightComp";
import LoginNavComp from "./components/NavBar/LoggedOut";
import style from "./homepage.module.css";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState({});
  const themeData = {
    light: {
      currTheme: "Light",
      bgColor: "#ffffff",
      borderColor: "#00000033",
      color: "#1a1a1b",
      navTabColor: "#0F1A1C",
      activeNavClr: "#000000",
      activeNavBg: "#EAEDEF",
    },
    dark: {
      currTheme: "Dark",
      bgColor: "#0B1416",
      borderColor: "#00000033",
      color: "#d7dadc",
      navTabColor: "#F2F4F5",
      activeNavClr: "#ffffff",
      activeNavBg: "#1A282D",
    },
  };

  useEffect(
    () => setTheme(isDark ? themeData.dark : themeData.light),
    [isDark]
  );

  return (
    <>
      <LoginNavComp theme={theme} />
      <div className={style.homePageContainer}>
        <HomeRightComp />
        <HomeLeftComp theme={theme} />
      </div>
    </>
  );
}
