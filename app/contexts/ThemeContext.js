"use client";
const { createContext, useState } = require("react");

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isLightTheme, setIsLightTheme] = useState(false);

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
