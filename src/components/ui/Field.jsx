import React from "react";

const Field = ({ label, hint, error, children }) => (
  <label className="block text-sm text-black">
    <span className="mb-1.5 block font-medium tracking-tight text-black">{label}</span>
    {children}
    {hint && <p className="mt-1 text-xs text-black">{hint}</p>}
    {error && (
      <p className="mt-1 text-sm text-black" role="alert">
        {error}
      </p>
    )}
  </label>
);

export default Field;
