"use client";
import React, { useContext, useState } from "react";
import style from "./createcommunity.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import { ST } from "next/dist/shared/lib/utils";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { isUnitless } from "@mui/material/styles/cssUtils";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import ExplicitOutlinedIcon from "@mui/icons-material/ExplicitOutlined";
import UserContext from "@/app/contexts/LoginContext";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { toast } from "react-toastify";

function CreateCommunityComp() {
  const { createCommunityModal, setCreateCommunityModal } =
    useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [isPublic, setIsPublic] = useState(true);
  const [isRestricted, setIsRestricted] = useState(false);
  const [isPrivate, setIsPrivate] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [open, setOpen] = useState(false);

  const handleNameInputChange = (event) => {
    setNameInput(event.target.value);
  };

  const notify = () => toast.success("Community created successfully!🎉");

  const createCommunityApi = async (token) => {
    const formData = new FormData();
    formData.append("name", nameInput);
    try {
      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/channel/",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },

          body: formData,
        }
      );

      if (!resp.ok) {
        return;
      }

      const result = await resp.json();
      setCreateCommunityModal(false);
      notify();
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handlePublicTypeClick = (e) => {
    setIsPublic(true);
    setIsPrivate(false);
    setIsRestricted(false);
  };

  const handleRestricted = (e) => {
    setIsRestricted(true);
    setIsPrivate(false);
    setIsPublic(false);
  };

  const handlePrivateTypeClick = (e) => {
    setIsPrivate(true);
    setIsPublic(false);
    setIsRestricted(false);
  };

  const handleSubmitBtnClick = (e) => {
    e.stopPropagation();
    if (localStorage.getItem("authToken") && nameInput) {
      createCommunityApi(localStorage.getItem("authToken"));
    }
  };

  return (
    <div
      className={style.mainContainer}
      style={{ backgroundColor: theme.createCommunityBg }}
    >
      <div className={style.wrapper}>
        <div className={style.headerContainer}>
          <div className={style.header}>
            <div className={style.titleGraphic}>
              <div className={style.titleImgMain}>
                <div className={style.loaded}>
                  <img
                    className={style.titleImg}
                    src="https://www.redditstatic.com/shreddit/assets/snoomojis/care.png"
                  />
                </div>
              </div>
            </div>
            <div className={style.title}>
              <span
                className={style.headingMain}
                style={{ color: theme.activeNavClr }}
              >
                Create a community
              </span>
            </div>
            <div className={style.closeBtnMain}>
              <button
                className={style.closeBtn}
                style={{
                  color: theme.activeNavClr,
                  backgroundColor: theme.activeNavBg,
                }}
                onClick={() => setCreateCommunityModal(false)}
              >
                <span className={style.closeBtnInner}>
                  <span className={style.flex}>
                    <CloseIcon />
                  </span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className={style.mainContent}>
          <p
            className={style.communityTxt}
            style={{ color: theme.communityTxtClr }}
          >
            Build and grow a community about something you care about. We'll
            help you set things up.
          </p>
          <div className={style.inputMain}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { m: 1, width: "95%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                sx={{
                  backgroundColor: theme.activeNavBg,
                }}
                value={nameInput}
                onChange={handleNameInputChange}
              />
            </Box>
            <p
              className={style.inputTxt}
              style={{
                color: theme.communityTxtClr,
              }}
            >
              Choose wisely. Once you pick a name, it can't be changed.
            </p>
          </div>
          <div className={style.communityTypeMain}>
            <h4
              className={style.typeHeading}
              style={{ color: theme.activeNavClr }}
            >
              Type
            </h4>
            <ul className={style.menu}>
              <label>
                <li className={style.menuList}>
                  <div
                    className={style.menuItemRadio}
                    style={{
                      color: theme.activeNavClr,
                      backgroundColor: isPublic
                        ? theme.activeNavBg
                        : "transparent",
                    }}
                  >
                    <span className={style.leftContent}>
                      <span className={style.iconMain}>
                        <PublicOutlinedIcon />
                      </span>
                      <span className={style.typeContent}>
                        <span className={style.typeTxt}>Public</span>
                        <span
                          className={style.typeDescription}
                          style={{ color: theme.popularCommunitiesTxt }}
                        >
                          Anyone can view, post, and comment to this community
                        </span>
                      </span>
                    </span>
                    <span className={style.rightContent}>
                      <span className={style.radioBtn}>
                        <div className={style.radioInputMain}>
                          <input
                            style={{ cursor: "pointer" }}
                            type="radio"
                            checked={isPublic}
                            onClick={handlePublicTypeClick}
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                </li>
              </label>
              <label>
                <li className={style.menuList}>
                  <div
                    className={style.menuItemRadio}
                    style={{
                      color: theme.activeNavClr,
                      backgroundColor: isRestricted
                        ? theme.activeNavBg
                        : "transparent",
                    }}
                  >
                    <span className={style.leftContent}>
                      <span className={style.iconMain}>
                        <VisibilityIcon />
                      </span>
                      <span className={style.typeContent}>
                        <span className={style.typeTxt}>Restricted</span>
                        <span
                          className={style.typeDescription}
                          style={{ color: theme.popularCommunitiesTxt }}
                        >
                          Anyone can view, but only approved users can
                          contribute
                        </span>
                      </span>
                    </span>
                    <span className={style.rightContent}>
                      <span className={style.radioBtn}>
                        <div className={style.radioInputMain}>
                          <input
                            style={{ cursor: "pointer" }}
                            type="radio"
                            checked={isRestricted}
                            onClick={handleRestricted}
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                </li>
              </label>
              <label>
                <li className={style.menuList}>
                  <div
                    className={style.menuItemRadio}
                    style={{
                      color: theme.activeNavClr,
                      backgroundColor: isPrivate
                        ? theme.activeNavBg
                        : "transparent",
                    }}
                  >
                    <span className={style.leftContent}>
                      <span className={style.iconMain}>
                        <LockOpenOutlinedIcon />
                      </span>
                      <span className={style.typeContent}>
                        <span className={style.typeTxt}>Private</span>
                        <span
                          className={style.typeDescription}
                          style={{ color: theme.popularCommunitiesTxt }}
                        >
                          Only approved users can view and submit to this
                          community
                        </span>
                      </span>
                    </span>
                    <span className={style.rightContent}>
                      <span className={style.radioBtn}>
                        <div className={style.radioInputMain}>
                          <input
                            style={{ cursor: "pointer" }}
                            type="radio"
                            checked={isPrivate}
                            onClick={handlePrivateTypeClick}
                          />
                        </div>
                      </span>
                    </span>
                  </div>
                </li>
              </label>
            </ul>
          </div>
          <hr
            className={style.borderLine}
            style={{ color: theme.sortBtmBorderClr }}
          />
          <ul className={style.btmMenu}>
            <li className={style.listItem}>
              <div
                className={style.menuItemCheckbox}
                style={{ color: theme.navTabColor }}
              >
                <span className={style.leftItem}>
                  <span className={style.iconContainer}>
                    <ExplicitOutlinedIcon />
                  </span>
                  <span className={style.itemContent}>
                    <span className={style.text14}>Mature (18+) </span>
                    <span
                      className={style.text12}
                      style={{ color: theme.popularCommunitiesTxt }}
                    >
                      Must be over 18 to view and contribute
                    </span>
                  </span>
                </span>
                <span className={style.rightItem}>
                  <span className={style.itemCtr}>
                    <div className={style.toggleInput}>
                      <IOSSwitch />
                    </div>
                  </span>
                </span>
              </div>
            </li>
          </ul>
          <div className={style.submitBtnMain}>
            <button
              className={style.cancelBtn}
              style={{
                color: theme.activeNavClr,
                backgroundColor: theme.activeNavBg,
              }}
            >
              <span className={style.cancelBtnCtr}>
                <span className={style.cancelBtnInner}>Cancel</span>
              </span>
            </button>
            {!nameInput && (
              <button
                className={style.cancelBtn}
                style={{
                  color: theme.activeNavClr,
                  backgroundColor: theme.activeNavBg,
                  opacity: "0.5",
                  cursor: "not-allowed",
                }}
              >
                <span className={style.cancelBtnCtr}>
                  <span className={style.cancelBtnInner}>
                    Create your community
                  </span>
                </span>
              </button>
            )}
            {nameInput && (
              <button
                className={style.submitBtn}
                onClick={(e) => handleSubmitBtnClick(e)}
              >
                <span className={style.submitBtnCtr}>
                  <span className={style.submitBtnInner}>
                    Create r/{nameInput}
                  </span>
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateCommunityComp;

const IOSSwitch = styled(Switch)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor:
          theme.palette.mode === "dark" ? "#2ECA45" : "rgb(80, 80, 239)",
        opacity: 1,
        border: 0,
      },
      "&.Mui-disabled + .MuiSwitch-track": {
        opacity: 0.5,
      },
    },
    "&.Mui-focusVisible .MuiSwitch-thumb": {
      color: "#33cf4d",
      border: "6px solid #fff",
    },
    "&.Mui-disabled .MuiSwitch-thumb": {
      color:
        theme.palette.mode === "light"
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    "&.Mui-disabled + .MuiSwitch-track": {
      opacity: theme.palette.mode === "light" ? 0.7 : 0.3,
    },
  },
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
  },
  "& .MuiSwitch-track": {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#E9E9EA" : "#39393D",
    opacity: 1,
    transition: theme.transitions.create(["background-color"], {
      duration: 500,
    }),
  },
}));
