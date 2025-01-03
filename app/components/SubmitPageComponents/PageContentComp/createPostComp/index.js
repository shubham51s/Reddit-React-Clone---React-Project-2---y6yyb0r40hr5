"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./createnewpost.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PostbtnAddIcon from "@mui/icons-material/PostAdd";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";
import UserContext from "@/app/contexts/LoginContext";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useRouter } from "next/navigation";
import { keyframes } from "@emotion/react";

function CreateNewPostComp({ isChannelSelected }) {
  const router = useRouter();
  const { isLoggedIn } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [addText, setAddText] = useState(false);
  const [isFancyEditor, setIsFancyEditor] = useState(true);
  const [titleInp, setTitleInp] = useState("");
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [textInput, setTxtInput] = useState("");
  const [addBtns, setAddBtns] = useState({
    oc: false,
    spoiler: false,
    nfsw: false,
  });
  const [draftNum, setDraftNum] = useState(false);
  const [isPost, setIsPost] = useState(false);
  const [isSaveDraft, setIsSaveDraft] = useState(false);
  const [channels, setChannels] = useState([]);
  const [community, setCommunity] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  const [imgInput, setImgInput] = useState(null);
  const [showImg, setShowImg] = useState(true);
  const [value, setValue] = useState("");

  const fetchPopularCommunities = async (defaultName) => {
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
      setChannels(result.data);

      const filteredChannels = result.data.map(({ _id, name }) => ({
        _id,
        name,
      }));
      const defaultUserName = { _id: "1", name: `u/${defaultName}` };
      if (defaultUserName) {
        setFilteredData([defaultUserName, ...filteredChannels]);
        setCommunity(defaultUserName);
      } else {
        setFilteredData(filteredChannels);
        setCommunity(filteredChannels[0]);
      }
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const addNewPost = async (token) => {
    try {
      const formData = new FormData();
      formData.append("title", titleInp);
      formData.append("content", titleInp);
      formData.append("images", imgInput ? imgInput : null);

      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/post/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
          body: formData,
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      router.push("/");
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const addCommunityPost = async (token, channelId) => {
    try {
      const formData = new FormData();
      formData.append("title", titleInp);
      formData.append("content", titleInp);
      formData.append("images", imgInput ? imgInput : null);
      formData.append("channelId", channelId);

      const resp = await fetch(
        "https://academics.newtonschool.co/api/v1/reddit/post/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
          body: formData,
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      router.push("/");
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const editPost = async (token, postId) => {
    try {
      const formData = new FormData();
      formData.append("title", titleInp);
      formData.append("content", titleInp);
      formData.append("images", imgInput ? imgInput : null);

      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/reddit/post/${postId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
          body: formData,
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
      router.push("/");
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleTitleInput = (e) => {
    setTitleInp(e.target.value);
    if (e.target.value.length >= 1) {
      setIsSaveDraft(true);
      setIsPost(true);
    } else {
      setIsSaveDraft(false);
      setIsPost(false);
    }
  };

  const handleNewPost = () => {
    if (isLoggedIn) {
      if (titleInp.length >= 1 && localStorage.getItem("authToken")) {
        if (isChannelSelected && sessionStorage.getItem("createPostId")) {
          if (sessionStorage.getItem("editPost")) {
            editPost(
              localStorage.getItem("authToken"),
              sessionStorage.getItem("createPostId")
            );
          } else {
            addCommunityPost(
              localStorage.getItem("authToken"),
              sessionStorage.getItem("createPostId")
            );
          }
        } else {
          if (community._id === "1") {
            addNewPost(localStorage.getItem("authToken"));
          } else if (community._id) {
            addCommunityPost(localStorage.getItem("authToken"), community._id);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("userName")) {
      fetchPopularCommunities(localStorage.getItem("userName"));
    }
    if (sessionStorage.getItem("createPostId")) {
      if (sessionStorage.getItem("editPost")) {
        setTitleInp(sessionStorage.getItem("postTitle"));
      }
    }
  }, []);

  const handleInputChange = (event) => {
    if (event.target.files[0]) {
      setImgInput(event.target.files[0]);
    }
  };

  const handleCommunityChange = (event, newValue) => {
    if (newValue) {
      setCommunity(newValue);
    }
  };

  return (
    <div className={style.mainContainer}>
      <div>
        <div
          className={style.createPostMain}
          style={{ borderColor: theme.headerBorderClr }}
        >
          <div
            className={style.cratePostHeading}
            style={{ color: theme.headerClr }}
          >
            Create a post
          </div>
          <button className={style.draftBtn} style={{ color: theme.draftsClr }}>
            Drafts
            <span
              className={style.draftsVal}
              style={{ backgroundColor: theme.arrowClr, color: theme.headerBg }}
            >
              {draftNum ? "1" : "0"}
            </span>
          </button>
        </div>
        <div className={style.communityMain}>
          {!isChannelSelected && (
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={filteredData}
              getOptionLabel={(option) => option.name}
              value={community}
              onChange={handleCommunityChange}
              sx={{ width: 300, backgroundColor: theme.policyBg }}
              renderInput={(params) => <TextField {...params} />}
            />
          )}
          {isChannelSelected && (
            <div
              className={style.selectedChannel}
              style={{
                backgroundColor: theme.policyBg,
                color: theme.headerClr,
              }}
            >{`${sessionStorage.getItem("createPostChannel")}`}</div>
          )}
        </div>
        <div
          className={style.createPostContent}
          style={{ backgroundColor: theme.policyBg }}
        >
          <div className={style.selectContainer}>
            <div className={style.optionsMain}>
              <button
                className={style.postBtn}
                style={{
                  color: addText ? theme.draftsClr : theme.arrowClr,
                  borderColor: theme.headerBorderClr,
                }}
                onClick={() => setAddText(true)}
              >
                <span
                  className={style.postIcon}
                  style={{ color: addText ? theme.draftsClr : theme.arrowClr }}
                >
                  <PostbtnAddIcon />
                </span>
                Post
              </button>
              <button
                className={style.postBtn}
                style={{
                  color: addText ? theme.arrowClr : theme.draftsClr,
                  borderColor: theme.headerBorderClr,
                }}
                onClick={() => setAddText(false)}
              >
                <span
                  className={style.postIcon}
                  style={{ color: addText ? theme.arrowClr : theme.draftsClr }}
                >
                  <InsertPhotoIcon />
                </span>
                Images &amp; Video
              </button>
              <button className={style.hideBtn}></button>
              <button className={style.hideBtn}></button>
            </div>
          </div>
          <div className={style.inputContainer}>
            <div className={style.titleMain}>
              <div className={style.titleContent}>
                <textarea
                  className={style.titleInput}
                  value={titleInp}
                  onChange={(e) => handleTitleInput(e)}
                  style={{
                    color: theme.headerClr,
                    borderColor: theme.headerBorderClr,
                    ":hover": {
                      backgroundColor: "red",
                    },
                  }}
                  maxLength={300}
                  placeholder="Title"
                ></textarea>
                <div
                  className={style.textLength}
                  style={{ color: theme.arrowClr }}
                >
                  {titleInp.length}/300
                </div>
              </div>
            </div>
            {!isFancyEditor && addText && (
              <div>
                <div>
                  <div
                    className={style.markdownModeMain}
                    style={{ borderColor: theme.headerBorderClr }}
                  >
                    <div
                      className={style.markdownHeaderMain}
                      style={{ backgroundColor: theme.noificationBg }}
                    >
                      <div className={style.markdownHeading}>
                        <span
                          className={style.markdown}
                          style={{ color: theme.headerClr }}
                        >
                          Markdown
                        </span>
                      </div>
                      <button
                        className={style.markdownSwitchBtn}
                        style={{ color: theme.draftsClr }}
                        onClick={() => setIsFancyEditor(true)}
                      >
                        <span>Switch to Fancy Pants Editor</span>
                      </button>
                    </div>
                    <div
                      className={style.markdownTxtMain}
                      style={{ backgroundColor: theme.headerBg }}
                    >
                      <textarea
                        className={style.markdownTxtArea}
                        style={{ color: theme.headerClr }}
                        placeholder="Text (optional)"
                        value={textInput}
                        onChange={(e) => setTxtInput(e.target.value)}
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isFancyEditor && addText && (
              <div>
                <div className={style.posRelative}>
                  <div
                    className={style.fancyEditorMain}
                    style={{
                      backgroundColor: theme.headerBg,
                      borderColor: theme.headerBorderClr,
                    }}
                  >
                    <div
                      className={style.fancyEditorHeaderMain}
                      style={{ backgroundColor: theme.noificationBg }}
                    >
                      <div className={style.headingLeft}>
                        <div className={style.leftIconsMain}>
                          <span>
                            <button
                              className={style.boldIconBtn}
                              style={{
                                color: isBold ? theme.color : theme.arrowClr,
                              }}
                              onClick={() => setIsBold(!isBold)}
                            >
                              <span className={style.boldIcon}>
                                <FormatBoldIcon />
                              </span>
                            </button>
                          </span>
                          <span>
                            <button
                              className={style.boldIconBtn}
                              style={{
                                color: isItalic ? theme.color : theme.arrowClr,
                              }}
                              onClick={() => setIsItalic(!isItalic)}
                            >
                              <span className={style.boldIcon}>
                                <FormatItalicIcon />
                              </span>
                            </button>
                          </span>
                        </div>
                      </div>
                      <div className={style.headingRight}>
                        <button
                          className={style.fancyEditorBtn}
                          style={{ color: theme.draftsClr }}
                          onClick={() => setIsFancyEditor(false)}
                        >
                          <span>Markdown Mode</span>
                        </button>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>
                          <div className={style.draftEditor}>
                            <div className={style.editorContainer}>
                              <div
                                className={style.draftEditorContent}
                                style={{
                                  color: theme.headerClr,
                                  backgroundColor: theme.headerBg,
                                }}
                              >
                                <textarea
                                  className={style.markdownTxtArea}
                                  style={{
                                    color: theme.headerClr,
                                    fontWeight: isBold ? "bold" : "400",
                                    fontStyle: isItalic ? "italic" : "normal",
                                  }}
                                  placeholder="Text (optional)"
                                  value={textInput}
                                  onChange={(e) => setTxtInput(e.target.value)}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!imgInput && !addText && (
              <div>
                <div className={style.posRelative}>
                  <div
                    className={style.imgContainerMain}
                    style={{
                      backgroundColor: theme.headerBg,
                      borderColor: theme.headerBorderClr,
                    }}
                  >
                    <div>
                      <div>
                        <div>
                          <div className={style.draftEditor}>
                            <div className={style.editorContainer}>
                              <div
                                className={style.draftEditorContent}
                                style={{
                                  color: theme.headerClr,
                                  backgroundColor: theme.headerBg,
                                }}
                              >
                                <div className={style.imgUploadArea}>
                                  Drag and Drop images or videos or{" "}
                                  <label
                                    className={style.uploadMediaBtn}
                                    style={{
                                      color: theme.activeNavClr,
                                      backgroundColor: theme.activeNavBg,
                                    }}
                                  >
                                    <span className={style.uploadMediaBtnCtr}>
                                      <span className={style.uploadMediaFlex}>
                                        <CloudUploadOutlinedIcon
                                          style={{
                                            color: theme.activeNavClr,
                                          }}
                                        />{" "}
                                        <input
                                          type="file"
                                          accept="image/*"
                                          onChange={handleInputChange}
                                          style={{ display: "none" }}
                                        />
                                      </span>
                                    </span>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!addText && imgInput && (
              <div>
                <div className={style.posRelative}>
                  <div
                    className={style.imgContainerMain}
                    style={{
                      backgroundColor: theme.headerBg,
                      borderColor: theme.headerBorderClr,
                    }}
                  >
                    <div>
                      <div>
                        <div>
                          <div className={style.draftEditor}>
                            <div className={style.editorContainer}>
                              <div
                                className={style.draftEditorContent}
                                style={{
                                  color: theme.headerClr,
                                  backgroundColor: theme.headerBg,
                                }}
                              >
                                <div className={style.imgUploadArea}>
                                  <img
                                    className={style.uploadedImg}
                                    src={URL.createObjectURL(imgInput)}
                                  />
                                </div>{" "}
                              </div>
                            </div>
                          </div>
                          <span
                            className={style.deleleImg}
                            style={{ backgroundColor: theme.activeNavBg }}
                            onClick={(e) => setImgInput(null)}
                          >
                            <DeleteOutlinedIcon />
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={style.saveContainer}>
            <div className={style.postTypeMain}>
              <div className={style.postTypeInner}>
                <button
                  className={style.addBtns}
                  style={{
                    borderColor: theme.arrowClr,
                    color: addBtns.oc ? "white" : theme.arrowClr,
                    backgroundColor: addBtns.oc ? "orangered" : "transparent",
                  }}
                  onClick={() => setAddBtns({ ...addBtns, oc: !addBtns.oc })}
                >
                  <span className={style.btnAddIcon}>
                    {addBtns.oc && <CheckIcon />}
                    {!addBtns.oc && <AddIcon />}
                  </span>
                  <span>OC</span>
                </button>
                <button
                  className={style.addBtns}
                  style={{
                    borderColor: theme.arrowClr,
                    color: addBtns.spoiler ? "white" : theme.arrowClr,
                    backgroundColor: addBtns.spoiler
                      ? "orangered"
                      : "transparent",
                  }}
                  onClick={() =>
                    setAddBtns({ ...addBtns, spoiler: !addBtns.spoiler })
                  }
                >
                  <span className={style.btnAddIcon}>
                    {addBtns.spoiler && <CheckIcon />}
                    {!addBtns.spoiler && <AddIcon />}
                  </span>
                  <span>Spoiler</span>
                </button>
                <button
                  className={style.addBtns}
                  style={{
                    borderColor: theme.arrowClr,
                    color: addBtns.nfsw ? "white" : theme.arrowClr,
                    backgroundColor: addBtns.nfsw ? "orangered" : "transparent",
                  }}
                  onClick={() =>
                    setAddBtns({ ...addBtns, nfsw: !addBtns.nfsw })
                  }
                >
                  <span className={style.btnAddIcon}>
                    {addBtns.nfsw && <CheckIcon />}
                    {!addBtns.nfsw && <AddIcon />}
                  </span>
                  <span>NSFW</span>
                </button>
              </div>
            </div>
            <hr
              className={style.btmBorder}
              style={{ borderColor: theme.headerBorderClr }}
            />
            <div className={style.saveBtnsMain}>
              <div className={style.saveBtnsInner}>
                <div className={style.btnAtEnd}>
                  <div className={style.rightBtnMain}>
                    <button
                      className={style.postButton}
                      style={{
                        backgroundColor: theme.postBtnBg,
                        color: theme.headerBg,
                        opacity: isPost ? "1" : "0.5",
                        cursor: isPost ? "pointer" : "not-allowed",
                      }}
                      onClick={handleNewPost}
                    >
                      Post
                    </button>
                  </div>
                  <div className={style.leftBtnMain}>
                    <button
                      className={style.saveDraftBtn}
                      style={{
                        borderColor: theme.postBtnBg,
                        color: theme.postBtnBg,
                        opacity: !draftNum && isSaveDraft ? "1" : "0.5",
                        cursor:
                          !draftNum && isSaveDraft ? "pointer" : "not-allowed",
                      }}
                      onClick={() => setDraftNum(true)}
                    >
                      Save Draft
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className={style.addContainer}
            style={{
              backgroundColor: theme.noificationBg,
              borderColor: theme.headerBorderClr,
            }}
          >
            <div className={style.checkContent}>
              <div className={style.checkInner}>
                <div className={style.checkboxContent}>
                  <div
                    className={style.checkboxInner}
                    style={{ color: theme.headerClr }}
                  >
                    <div className={style.sendReply}>
                      <input type="checkbox" className={style.chekcbox} />
                      <div
                        className={style.checkboxTxt}
                        style={{ color: theme.headerClr }}
                      >
                        Send me post reply notifications
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateNewPostComp;

const top100Films = [
  { label: "The Shawshank Redemption", year: 1994 },
  { label: "The Godfather", year: 1972 },
  { label: "The Godfather: Part II", year: 1974 },
  { label: "The Dark Knight", year: 2008 },
  { label: "12 Angry Men", year: 1957 },
  { label: "Schindler's List", year: 1993 },
  { label: "Pulp Fiction", year: 1994 },
  {
    label: "The Lord of the Rings: The Return of the King",
    year: 2003,
  },
  { label: "The Good, the Bad and the Ugly", year: 1966 },
  { label: "Fight Club", year: 1999 },
  {
    label: "The Lord of the Rings: The Fellowship of the Ring",
    year: 2001,
  },
];
