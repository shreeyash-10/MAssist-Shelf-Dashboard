import React from "react";

const Button = ({ children, variant = "primary", className = "", ...rest }) => {
  const base = "inline-flex items-center justify-center gap-2 rounded-md transition focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-gray-900";
  const styles = {
    primary: `${base} bg-red-600 px-4 py-2 text-white hover:bg-red-700 active:bg-red-800`,
    outline: `${base} border border-gray-300 bg-white px-3 py-2 text-gray-800 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700`,
    ghost: `${base} px-2.5 py-2 text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800`,
    soft: `${base} bg-gray-100 px-3 py-1.5 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700`,
  };

  const style = styles[variant] || styles.primary;

  return (
    <button className={`${style} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
};

export default Button;