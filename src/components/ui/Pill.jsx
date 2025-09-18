import React from "react";

const variantClasses = {
  outline: "pill text-black border-black/15 bg-black/05",
  filled: "bg-black text-white border-transparent",
  glass: "pill text-black border-black/15 bg-black/08",
};

const aliasMap = {
  default: "outline",
};

const Pill = ({
  children,
  className = "",
  variant = "outline",
  active = false,
  as = "button",
  ...rest
}) => {
  const Component = as;
  const resolvedVariant = aliasMap[variant] || variant;
  const styles = variantClasses[resolvedVariant] || variantClasses.outline;
  const activeStyles = active ? "bg-black/15 text-black" : "";
  const base = "inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] transition duration-200 ease-brand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

  return (
    <Component className={`${base} ${styles} ${activeStyles} ${className}`.trim()} {...rest}>
      {children}
    </Component>
  );
};

export default Pill;
