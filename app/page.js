"use client";
import { useContext, useEffect, useState } from "react";
import HomeLeftComp from "./components/HomeComponents/homeLeftComp";
import HomeRightComp from "./components/HomeComponents/homeRightComp";
import LoginNavComp from "./components/NavBar/LoggedOut";
import style from "./homepage.module.css";
import LogoutNavComp from "./components/NavBar/LoggedIn";
import LoginComp from "./components/userLoginComponents";
import ThemeContext from "./contexts/ThemeContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import UserContext, { UserProvider } from "./contexts/LoginContext";

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [popularCommunities, setPopularCommunities] = useState([]);
  const [postResult, setPostResult] = useState([]);
  const [userLoginModal, setUserLoginModal] = useState(true);

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
      setPopularCommunities(result.data);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const fetchPosts = async () => {
    try {
      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/post?limit=100",
        {
          headers: {
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      setPostResult(result.data);
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  useEffect(() => {
    fetchPopularCommunities();
    fetchPosts();
  }, []);

  return (
    <ThemeProvider>
      <UserProvider>
        {userLoginModal && (
          <LoginComp
            userLoginModal={userLoginModal}
            setUserLoginModal={setUserLoginModal}
          />
        )}
        <LogoutNavComp />
        <div className={style.homePageContainer}>
          <HomeRightComp
            popularCommunities={popularCommunities}
            postResult={postResult}
          />
          <HomeLeftComp />
        </div>
      </UserProvider>
    </ThemeProvider>
  );
}
