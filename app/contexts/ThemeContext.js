"use client";
const { createContext, useState } = require("react");

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(true);

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
      redditLogo: "orangered",
      linkColor: "#0045AC",
      lineBg: "#D6D6D6",
      commentClr: "#131313",
      addCommentClr: "#0e0f0f",
      addCommentBg: "#fafafa",
      addCmntBtnClr: "#656769",
      cancelBtnBg: "#e7e8e8",
      commentSubBg: "#474849",
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
      redditLogo: "white",
      linkColor: "#0045AC",
      lineBg: "#303030",
      commentClr: "#F2F2F2",
      addCommentClr: "#00111a",
      addCommentBg: "#f7fbff",
      addCmntBtnClr: "#006f96",
      cancelBtnBg: "#d3ebfe",
      commentSubBg: "#2a4682",
    },
  };

  const [theme, setTheme] = useState(
    isLightTheme ? themeData.light : themeData.dark
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
