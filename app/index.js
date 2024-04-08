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

function HomePage() {
  const { userLoginModal, setUserLoginModal } = useContext(UserContext);
  const [showComments, setShowComments] = useState(
    sessionStorage.getItem("showComments") ? true : false
  );

  const [imageOnly, setImgOnly] = useState(false);
  const [imageUrl, setImgUrl] = useState("");

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

  useEffect(() => {
    fetchPopularCommunities();
    fetchPosts();
  }, []);

  return (
    <>
      {imageOnly && <FullImgComp imageUrl={imageUrl} setImgOnly={setImgOnly} />}

      {userLoginModal && <LoginComp />}
      <LogoutNavComp />
      <div className={style.homePageContainer}>
        {!showComments && (
          <HomeRightComp
            popularCommunities={popularCommunities}
            postResult={postResult}
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
      </div>
    </>
  );
}

export default HomePage;
