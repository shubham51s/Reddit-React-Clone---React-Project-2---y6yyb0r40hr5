"use client";

const { createContext, useState, useEffect } = require("react");

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLoginModal, setUserLoginModal] = useState(false);
  const [loggedUserInfo, setLoggedUserInfo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [postItem, setPostItem] = useState([]);
  const myProjectId = "y6yyb0r40hr5";
  const [createCommunityModal, setCreateCommunityModal] = useState(false);

  const [isPopular, setIsPopular] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      setIsLoggedIn(true);
    }
    if (sessionStorage.getItem("popularResults")) {
      setIsPopular(true);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userLoginModal,
        setUserLoginModal,
        loggedUserInfo,
        setLoggedUserInfo,
        isLoggedIn,
        setIsLoggedIn,
        showComments,
        setShowComments,
        postItem,
        setPostItem,
        myProjectId,
        createCommunityModal,
        setCreateCommunityModal,
        isPopular,
        setIsPopular,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
