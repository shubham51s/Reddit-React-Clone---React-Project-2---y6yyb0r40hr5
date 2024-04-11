"use client";
import React, { useContext, useState } from "react";
import style from "./createnewpost.module.css";
import ThemeContext from "@/app/contexts/ThemeContext";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import PostbtnAddIcon from "@mui/icons-material/PostAdd";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/Check";

function CreateNewPostComp() {
  const { theme } = useContext(ThemeContext);
  const [addText, setAddText] = useState(true);
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

  return (
    <div className={style.mainContainer}>
      {/* if required another div as 2 child for mainContainer */}
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
              {/* need to add draft value later */}
              {draftNum ? "1" : "0"}
            </span>
          </button>
        </div>
        <div className={style.communityMain}>
          <div
            className={style.communityContent}
            style={{
              borderColor: theme.headerBorderClr,
              backgroundColor: theme.headerBg,
            }}
          >
            <div className={style.communityInner}>
              <span
                className={style.circle}
                style={{ borderColor: theme.arrowClr }}
              ></span>
              {/* need to change community name later */}
              {/* also need to add community list later */}
              <div className={style.communityTxtMain}>
                u/
                <span style={{ textTransform: "capitalize" }}>
                  {localStorage.getItem("userName")}
                </span>
              </div>
              <div>
                <span
                  className={style.downArrow}
                  style={{ color: theme.arrowClr }}
                >
                  <KeyboardArrowDownIcon />
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={style.createPostContent}
          style={{ backgroundColor: theme.policyBg }}
        >
          <div className={style.selectContainer}>
            <div className={style.optionsMain}>
              {/* need to change color and bg color according to selected type */}
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
            {!isFancyEditor && (
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
            {isFancyEditor && (
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