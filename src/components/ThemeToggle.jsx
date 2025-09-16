import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? "Light" : "Dark"}
    </button>
  );
};

export default ThemeToggle;