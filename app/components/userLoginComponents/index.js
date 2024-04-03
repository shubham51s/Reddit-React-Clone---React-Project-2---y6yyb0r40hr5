import React, { useState } from "react";
import style from "./userlogincomponent.module.css";
import ClearIcon from "@mui/icons-material/Clear";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

function LoginComp({ theme }) {
  const [isLogin, setIsLogin] = useState(true);
  const [newUser, setNewUser] = useState(false);

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
                <ClearIcon />
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
                  label={isLogin ? "Email or username" : "Email"}
                  id="filled-size-normal"
                  variant="filled"
                />
              </Box>
            </div>
          </div>
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
                  />{" "}
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
                  />{" "}
                </Box>
              </div>
            </div>
          )}
          <div className={style.forgotPassContainer}>
            <span style={{ color: theme.linkColor }}>
              {isLogin ? "Forgot password?" : ""}
            </span>
          </div>
          <div className={style.signUpTxtContainer}>
            {isLogin ? " New to Reddit? " : "Already a redditor? "}
            <span
              style={{ color: theme.linkColor, cursor: "pointer" }}
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Log In"}
            </span>
          </div>
        </div>
        <div
          className={style.signUpContainer}
          style={{ marginTop: !isLogin ? "55px" : "5px" }}
        >
          <button className={style.signUpBtn}>
            <span className={style.btnCtr}>
              <span className={style.signUpBtnInner}>{`Log In`}</span>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginComp;
