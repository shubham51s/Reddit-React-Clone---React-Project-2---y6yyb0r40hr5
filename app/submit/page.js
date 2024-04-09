"use client";
import React, { useContext } from "react";
import CreatePostPage from ".";
import { ThemeProvider } from "../contexts/ThemeContext";
import { UserProvider } from "../contexts/LoginContext";

function SubmitPage() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CreatePostPage />
      </UserProvider>
    </ThemeProvider>
  );
}

export default SubmitPage;
