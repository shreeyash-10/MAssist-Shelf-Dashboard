import React from "react";

export const Icon = {
  menu: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path strokeWidth="2" strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  search: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <circle cx="11" cy="11" r="7" strokeWidth="2" />
      <path d="M20 20l-3.5-3.5" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  chevronDown: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M6 9l6 6 6-6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  eye: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" strokeWidth="2" />
    </svg>
  ),
  download: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <path d="M12 3v12" strokeWidth="2" strokeLinecap="round" />
      <path d="M7 10l5 5 5-5" strokeWidth="2" strokeLinecap="round" />
      <path d="M4 21h16" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  calendar: (props) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" strokeWidth="2" />
      <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  dots: (props) => (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  ),
};

export default Icon;