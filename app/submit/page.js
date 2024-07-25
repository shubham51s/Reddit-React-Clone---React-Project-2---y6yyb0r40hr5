"use client";
import React, { useContext } from "react";
import CreatePostPage from ".";
import { ThemeProvider } from "../contexts/ThemeContext";
import { UserProvider } from "../contexts/LoginContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SubmitPage() {
  return (
    <ThemeProvider>
      <UserProvider>
        <CreatePostPage />
        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </UserProvider>
    </ThemeProvider>
  );
}

export default SubmitPage;
