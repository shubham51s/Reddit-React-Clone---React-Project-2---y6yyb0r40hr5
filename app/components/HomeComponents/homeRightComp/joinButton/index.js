import React, { useContext, useState } from "react";
import style from "./joinbutton.module.css";
import UserContext from "@/app/contexts/LoginContext";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

function JoinBtnComp({ item }) {
  const { isLoggedIn, setUserLoginModal } = useContext(UserContext);
  const [isJoined, setIsJoined] = useState(false);
  const [open, setOpen] = useState(false);
  const [openUnfollow, setOpenUnfollow] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleUnfollowClick = () => {
    setOpenUnfollow(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleUnfollowClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenUnfollow(false);
  };

  const followUser = async (id, token) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/quora/follow/${id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const unfollowUser = async (id, token) => {
    try {
      const resp = await fetch(
        `https://academics.newtonschool.co/api/v1/quora/follow/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            projectID: "y6yyb0r40hr5",
          },
        }
      );
      if (!resp.ok) return;
      const result = await resp.json();
    } catch (err) {
      console.log(err.message ? err.message : err);
    }
  };

  const handleJoinBtn = () => {
    if (!isLoggedIn) {
      setUserLoginModal(true);
    } else {
      setIsJoined(!isJoined);
      if (isJoined) {
        unfollowUser(item._id, localStorage.getItem("authToken"));
        handleUnfollowClick();
      } else {
        followUser(item._id, localStorage.getItem("authToken"));
        handleClick();
      }
    }
  };

  return (
    <div className={style.joinBtnMain}>
      <button className={style.joinBtn} onClick={handleJoinBtn}>
        {`${isJoined ? "Joined" : "Join"}`}
      </button>
      <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: "100%" }}
        >
          You followed {item.channel ? item.channel.name : item.author.name}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openUnfollow}
        autoHideDuration={2000}
        onClose={handleUnfollowClose}
      >
        <Alert
          onClose={handleUnfollowClose}
          severity="success"
          variant="filled"
          sx={{
            width: "100%",
            backgroundColor: "red",
          }}
        >
          You unfollowed {item.channel ? item.channel.name : item.author.name}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default JoinBtnComp;
