import React from "react";

const Logo = () => (
  <div className="flex items-center gap-2" aria-label="Massist">
    <svg width="28" height="24" viewBox="0 0 56 48" className="text-red-500" aria-hidden="true">
      <circle cx="8" cy="8" r="6" fill="#ef4444" />
      <circle cx="20" cy="8" r="3" fill="#ef4444" />
      <circle cx="30" cy="8" r="3" fill="#ef4444" />
      <circle cx="40" cy="8" r="3" fill="#ef4444" />
      <circle cx="50" cy="8" r="3" fill="#ef4444" />
    </svg>
    <span className="text-xl font-semibold tracking-tight">Massist</span>
  </div>
);

export default Logo;