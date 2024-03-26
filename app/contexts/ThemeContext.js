"use client";
import React, { createContext, useState } from "react";

const ThemeContext = createContext();
const [isDark, setIsDark] = useState(false);

export const ThemeProvider = ({ children }) => {
  return (
    <ThemeContext.Provider value={{ isDark }}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContext;
