import React from "react";

const Field = ({ label, hint, error, children }) => (
  <label className="block">
    <span className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-200">{label}</span>
    {children}
    {hint && <p className="mt-1 text-xs text-gray-500">{hint}</p>}
    {error && (
      <p className="mt-1 text-sm text-red-600" role="alert">
        {error}
      </p>
    )}
  </label>
);

export default Field;