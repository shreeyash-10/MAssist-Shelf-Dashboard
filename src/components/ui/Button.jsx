import React from "react";

const variantMap = {
  primary: "bg-brand-100 hover:bg-brand-200 active:bg-brand-200 text-black shadow-glass",
  secondary: "glass text-black hover:bg-black/5 transition-colors border border-black/15",
  ghost: "text-black hover:text-black/70",
  link: "text-black underline underline-offset-4 hover:text-black/70",
};

const aliasMap = {
  outline: "secondary",
  soft: "secondary",
};

const Button = ({ children, className = "", variant = "primary", type = "button", ...rest }) => {
  const resolvedVariant = aliasMap[variant] || variant;
  const variantClasses = variantMap[resolvedVariant] || variantMap.primary;

  const base = "inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold tracking-tight transition duration-200 ease-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <button type={type} className={`${base} ${variantClasses} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
};

export default Button;
