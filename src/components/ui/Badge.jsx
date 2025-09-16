import React from "react";

const Badge = ({ tone = "green", children }) => {
  const toneClass = {
    green: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
    red: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300",
    gray: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-200",
  }[tone] || "";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${toneClass}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {children}
    </span>
  );
};

export default Badge;