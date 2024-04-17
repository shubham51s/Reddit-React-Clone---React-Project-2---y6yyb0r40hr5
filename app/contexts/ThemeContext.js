"use client";
const { createContext, useState } = require("react");

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(
    localStorage.getItem("darkModeIsActive") ? true : false
  );

  const themeData = {
    light: {
      borderLine: "#00000033",
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
      commentBg: "#f4f5f6",
      rulesClr: "#61686e",
      communityHeading: "#32363a",
      descriptionClr: "#61686e",
      headerClr: "#1c1c1c",
      headerBg: "#FFFFFF",
      headerBorderClr: "#EDEFF1",
      arrowClr: "#878A8C",
      submitPageBg: "#DAE0E6",
      policyBg: "#FFFFFF",
      policyClr: "#7c7c7c",
      policyLinkClr: "#0079D3",
      draftsClr: "#0079D3",
      noificationBg: "#F6F7F8",
      postBtnBg: "#0079D3",
      createCommunityBg: "#ffffff",
    },
    dark: {
      borderLine: "#ffffff33",
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
      commentBg: "#F9FAFA",
      rulesClr: "#576F76",
      communityHeading: "#B8C5C9",
      descriptionClr: "#82959B",
      headerClr: "#D7DADC",
      headerBg: "#1A1A1B",
      headerBorderClr: "#343536",
      arrowClr: "#818384",
      submitPageBg: "#030303",
      policyBg: "#1A1A1B",
      policyClr: "#818384",
      policyLinkClr: "#0079D3",
      draftsClr: "#D7DADC",
      noificationBg: "#272729",
      postBtnBg: "#D7DADC",
      createCommunityBg: "#0F1A1C",
    },
  };

  const [theme, setTheme] = useState(
    !isDarkMode ? themeData.light : themeData.dark
  );

  const handleThemeChange = (isdark) => {
    setTheme(isdark ? themeData.dark : themeData.light);
  };

  return (
    <ThemeContext.Provider
      value={{ theme, setTheme, handleThemeChange, isDarkMode, setIsDarkMode }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
