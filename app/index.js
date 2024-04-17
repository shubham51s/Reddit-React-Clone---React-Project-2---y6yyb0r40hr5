"use client";
import { useContext, useEffect, useState } from "react";
import style from "./homepage.module.css";
import LoginComp from "./components/userLoginComponents";
import LogoutNavComp from "./components/NavBar/LoggedIn";
import HomeRightComp from "./components/HomeComponents/homeRightComp";
import HomeLeftComp from "./components/HomeComponents/homeLeftComp";
import UserContext from "./contexts/LoginContext";
import ShowCommentsComp from "./components/HomeComponents/commentsComp";
import FullImgComp from "./components/HomeComponents/fullImageComp";
import HomeLeftDrawerComp from "./components/HomeComponents/homeLeftComp/homeLeftDrawer";
import ThemeContext from "./contexts/ThemeContext";
import CreateCommunityComp from "./components/createCommunityComponents";
function HomePage() {
  const {
    userLoginModal,
    setUserLoginModal,
    showComments,
    setShowComments,
    isLoggedIn,
    createCommunityModal,
    setCreateCommunityModal,
  } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);

  const [imageOnly, setImgOnly] = useState(false);
  const [imageUrl, setImgUrl] = useState("");
  const [isNavDrawer, setIsNavDrawer] = useState(false);

  const [popularCommunities, setPopularCommunities] = useState([]);
  const [postResult, setPostResult] = useState([]);

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

  const fetchLoggedInPosts = async (token) => {
    try {
      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/post?limit=100",
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    if (isLoggedIn) {
      fetchLoggedInPosts(localStorage.getItem("authToken"));
    } else {
      fetchPosts();
    }
  }, []);

  return (
    <>
      {imageOnly && <FullImgComp imageUrl={imageUrl} setImgOnly={setImgOnly} />}

      {userLoginModal && <LoginComp />}
      <LogoutNavComp
        setIsNavDrawer={setIsNavDrawer}
        isNavDrawer={isNavDrawer}
      />
      {createCommunityModal && <CreateCommunityComp />}
      <div
        className={style.homePageContainer}
        style={{ backgroundColor: theme.bgColor }}
      >
        {!showComments && (
          <HomeRightComp
            popularCommunities={popularCommunities}
            postResult={postResult}
            setPostResult={setPostResult}
            setShowComments={setShowComments}
            setImgOnly={setImgOnly}
            setImgUrl={setImgUrl}
          />
        )}
        {showComments && (
          <ShowCommentsComp
            setShowComments={setShowComments}
            setImgOnly={setImgOnly}
            setImgUrl={setImgUrl}
          />
        )}
        <HomeLeftComp />
        {isNavDrawer && <HomeLeftDrawerComp />}
      </div>
    </>
  );
}

export default HomePage;
