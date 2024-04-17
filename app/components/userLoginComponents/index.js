import React, { useContext, useState } from "react";
import style from "./userlogincomponent.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SetMeal } from "@mui/icons-material";
import ThemeContext from "@/app/contexts/ThemeContext";
import UserContext from "@/app/contexts/LoginContext";

function LoginComp() {
  const {
    loggedUserInfo,
    setUserLoginModal,
    setLoggedUserInfo,
    setIsLoggedIn,
  } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);

  const [isLogin, setIsLogin] = useState(true);
  const [newUser, setNewUser] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const [isError, setIsError] = useState("");

  const handleEmailChange = (e) => {
    setUserEmail(e.target.value);
    setIsError("");
  };

  const handlePasswordChange = (e) => {
    setUserPass(e.target.value);
    setIsError("");
  };

  const handleNameChange = (e) => {
    setUserName(e.target.value);
    setIsError("");
  };

  const signUpUser = async () => {
    try {
      const user = {
        name: userName,
        email: userEmail,
        password: userPass,
        appType: "reddit",
      };
      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "y6yyb0r40hr5",
          },
          body: JSON.stringify({ ...user }),
        }
      );
      if (!resp.json) {
        setIsError("SignUp failed");
        return;
      }
      const result = await resp.json();
      setUserEmail("");
      setUserPass("");
      setUserName("");
      setIsLogin(true);
    } catch (err) {
      console.log(err.message ? err.message : err);
      setIsError("Please enter valid details");
    }
  };

  const LoginUser = async () => {
    try {
      const user = {
        email: userEmail,
        password: userPass,
        appType: "reddit",
      };
      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            projectID: "y6yyb0r40hr5",
          },
          body: JSON.stringify({ ...user }),
        }
      );
      if (!resp.ok) {
        setIsError("User not found");
        return;
      }
      const result = await resp.json();
      const { token } = result;
      const name = result.data.name;
      const email = result.data.email;
      const userId = result.data._id;
      localStorage.setItem("authToken", token);
      localStorage.setItem("userName", name);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", userId);
      setLoggedUserInfo(result.data);
      setUserEmail("");
      setUserPass("");
      setIsLoggedIn(true);
      setUserLoginModal(false);
    } catch (err) {
      setIsError("User not found !");
      console.log(err.message ? err.message : err);
    }
  };

  const handleSubmitButton = () => {
    setIsLogin(!isLogin);
    setIsError("");
    setNewUser(false);
    setUserName("");
    setUserPass("");
    setUserEmail("");
  };

  const handleLoginBtn = (e) => {
    e.preventDefault();
    if (!userEmail.includes("@gmail.com") || userEmail.length <= 10) {
      setIsError("Please enter valid email address");
    } else if (userPass.length <= 2) {
      setIsError("Please enter valid password");
    } else {
      LoginUser();
    }
  };

  const handleSignUpBtn = (e) => {
    e.preventDefault();
    if (!userEmail.includes("@gmail.com") || userEmail.length <= 10) {
      setIsError("Please enter valid email address");
    } else {
      setNewUser(true);
    }
    if (newUser) {
      if (userName.length <= 2) {
        setIsError("Please enter valid username");
      } else if (userPass.length <= 2) {
        setIsError("Please enter valid password");
      } else {
        signUpUser();
      }
    }
  };

  return (
    <div
      className={style.mainLoginContainer}
      style={{ backgroundColor: theme.bgColor }}
    >
      <div>
        <div className={style.clearIconContainer}>
          <div></div>
          <button
            className={style.clearIconBtn}
            style={{ backgroundColor: theme.activeNavBg }}
          >
            <span className={style.clearIconBtnInner}>
              <span className={style.flex}>
                <ClearIcon onClick={() => setUserLoginModal(false)} />
              </span>
            </span>
          </button>
        </div>
        <div
          className={style.loginContainer}
          style={{ backgroundColor: theme.bgColor }}
        >
          <h1
            className={style.mainHeading}
            style={{ color: theme.navTabColor }}
          >
            {isLogin ? "Log In" : "Sign Up"}
          </h1>
          <p className={style.termsTxt}>
            By continuing, you agree to our{" "}
            <span
              className={style.termsLink}
              style={{ color: theme.linkColor }}
            >
              User Agreement
            </span>
            and acknowledge that you understand the{" "}
            <span className={style.termsLink}>Privacy Policy</span>.
          </p>
          <div className={style.loginOptionContainer}>
            <div>
              <div className={style.optionsContent}>
                <div className={style.optionList}>
                  <div
                    className={style.optionMain}
                    style={{
                      backgroundColor: theme.bgColor,
                      borderColor: theme.borderColor,
                    }}
                  >
                    <div
                      className={style.signInOption}
                      style={{ color: theme.navTabColor }}
                    >
                      <GoogleIcon />
                      <span className={style.optionTxt}>
                        Continue with Google (coming soon)
                      </span>
                    </div>
                    <div></div>
                  </div>
                </div>
                <div className={style.optionList}>
                  <div
                    className={style.optionMain}
                    style={{
                      backgroundColor: theme.bgColor,
                      borderColor: theme.borderColor,
                    }}
                  >
                    <div
                      className={style.signInOption}
                      style={{ color: theme.navTabColor }}
                    >
                      <AppleIcon />
                      <span className={style.optionTxt}>
                        Continue with Apple (coming soon)
                      </span>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
            <div className={style.btmLineMain}>
              <hr
                className={style.horizontalLine}
                style={{ backgroundColor: theme.lineBg }}
              />
              <span
                className={style.lineTxt}
                style={{ color: theme.popularCommunitiesTxt }}
              >
                OR
              </span>
              <hr
                className={style.horizontalLine}
                style={{ backgroundColor: theme.lineBg }}
              />
            </div>
          </div>{" "}
          {isLogin && (
            <div className={style.inputContainer}>
              <div className={style.inputContent}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "100%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Email"
                    id="filled-size-normal"
                    variant="filled"
                    value={userEmail}
                    onChange={(e) => handleEmailChange(e)}
                  />
                </Box>
              </div>
            </div>
          )}
          {!isLogin && !newUser && (
            <div className={style.inputContainer}>
              <div className={style.inputContent}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "100%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Email"
                    id="filled-size-normal"
                    variant="filled"
                    value={userEmail}
                    onChange={(e) => handleEmailChange(e)}
                  />
                </Box>
              </div>
            </div>
          )}
          {isLogin && (
            <div className={style.inputContainer}>
              <div className={style.inputContent}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "100%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Password"
                    id="filled-size-normal"
                    variant="filled"
                    value={userPass}
                    onChange={(e) => handlePasswordChange(e)}
                  />
                </Box>
              </div>
            </div>
          )}
          {!isLogin && newUser && (
            <div className={style.inputContainer}>
              <div className={style.inputContent}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "100%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Username"
                    id="filled-size-normal"
                    variant="filled"
                    value={userName}
                    onChange={(e) => handleNameChange(e)}
                  />
                </Box>
              </div>
            </div>
          )}
          {!isLogin && newUser && (
            <div className={style.inputContainer}>
              <div className={style.inputContent}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": {
                      m: 1,
                      width: "100%",
                    },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    label="Password"
                    id="filled-size-normal"
                    variant="filled"
                    value={userPass}
                    onChange={(e) => handlePasswordChange(e)}
                  />
                </Box>
              </div>
            </div>
          )}
          <div className={style.forgotPassContainer}>
            {isError && (
              <div style={{ color: "red", margin: "5px 80px" }}>{isError}</div>
            )}
            <span style={{ color: theme.linkColor }}>
              {isLogin ? "Forgot password?" : ""}
            </span>
          </div>
          <div className={style.signUpTxtContainer}>
            {isLogin ? " New to Reddit? " : "Already a redditor? "}
            <span
              style={{ color: theme.linkColor, cursor: "pointer" }}
              onClick={() => handleSubmitButton()}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </span>
          </div>
        </div>
        {isLogin && (
          <div className={style.signUpContainer}>
            <button
              className={style.signUpBtn}
              onClick={(e) => handleLoginBtn(e)}
            >
              <span className={style.btnCtr}>
                <span className={style.signUpBtnInner}>Log In</span>
              </span>
            </button>
          </div>
        )}
        {!isLogin && (
          <div className={style.signUpContainer} style={{ marginTop: "55px" }}>
            <button
              className={style.signUpBtn}
              onClick={(e) => handleSignUpBtn(e)}
            >
              <span className={style.btnCtr}>
                <span className={style.signUpBtnInner}>Sign Up</span>
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginComp;
