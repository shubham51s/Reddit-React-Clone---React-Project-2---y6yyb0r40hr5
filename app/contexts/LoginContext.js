"use client";

const { createContext, useState } = require("react");

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userLoginModal, setUserLoginModal] = useState(false);
  const [loggedUserInfo, setLoggedUserInfo] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("userName") ? true : false
  );

  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <UserContext.Provider
      value={{
        userLoginModal,
        setUserLoginModal,
        loggedUserInfo,
        setLoggedUserInfo,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
