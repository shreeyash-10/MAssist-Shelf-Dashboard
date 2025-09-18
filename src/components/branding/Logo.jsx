import React from "react";

const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-2 ${className}`} aria-label="Indus AI">
    <svg width="28" height="24" viewBox="0 0 56 48" aria-hidden="true">
      <circle cx="10" cy="14" r="8" fill="#000000" />
      <circle cx="26" cy="12" r="5" fill="#333333" />
      <circle cx="40" cy="18" r="6" fill="#666666" />
      <circle cx="34" cy="6" r="4" fill="#808080" />
      <circle cx="48" cy="10" r="3" fill="#a6a6a6" />
    </svg>
    <span className="text-lg font-semibold tracking-tight text-black">Indus AI</span>
  </div>
);

export default Logo;
