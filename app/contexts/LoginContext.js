"use client";

const { createContext, useState } = require("react");

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [loggedUserInfo, setLoggedUserInfo] = useState([]);

  return (
    <UserContext.Provider
      value={{
        loggedUserInfo,
        setLoggedUserInfo,
        userLoginModal,
        setUserLoginModal,
      }}
    ></UserContext.Provider>
  );
};

export default UserContext;
