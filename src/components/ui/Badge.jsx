import React from "react";

const Badge = ({ tone = "default", children }) => {
  const toneClass = {
    green: "bg-black/10 text-black",
    red: "bg-black/12 text-black",
    gray: "bg-black/8 text-black",
    default: "bg-black/10 text-black",
  }[tone] || "bg-black/10 text-black";

  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold tracking-wide ${toneClass}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-black" />
      {children}
    </span>
  );
};

export default Badge;
