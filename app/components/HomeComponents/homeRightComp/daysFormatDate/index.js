"use client";
import React from "react";

function DateFormatter({ createdAt }) {
  function timeAgo(createdAt) {
    const currentDate = new Date();
    const postDate = new Date(createdAt);
    const timeDifference = currentDate - postDate;

    const seconds = timeDifference / 1000;

    if (seconds < 60) {
      return "just now";
    } else if (seconds < 60 * 60) {
      const minutes = Math.floor(seconds / 60);
      return `${minutes} min ago`;
    } else if (seconds < 60 * 60 * 24) {
      const hours = Math.floor(seconds / (60 * 60));
      return `${hours} hr ago`;
    } else {
      const days = Math.floor(seconds / (60 * 60 * 24));
      return `${days} days ago`;
    }
  }

  return <span>{timeAgo(createdAt)}</span>;
}

export default DateFormatter;
