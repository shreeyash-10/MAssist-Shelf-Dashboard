import React from "react";
import { useTheme } from "../context/ThemeContext";
import { Button } from "./ui";

const ThemeToggle = () => {
  const { theme } = useTheme();
  return (
    <Button onClick={() => {}} aria-label="Theme is locked to light">
      {theme === "dark" ? "Light Mode" : "Light Mode"}
    </Button>
  );
};

export default ThemeToggle;
