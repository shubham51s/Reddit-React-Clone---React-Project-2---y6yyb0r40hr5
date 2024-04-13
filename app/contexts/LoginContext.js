"use client";

const { createContext, useState } = require("react");

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLoginModal, setUserLoginModal] = useState(false);
  const [loggedUserInfo, setLoggedUserInfo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userName") ? true : false
  );
  const [showComments, setShowComments] = useState(false);
  const [postItem, setPostItem] = useState([]);
  const myProjectId = "y6yyb0r40hr5";

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
