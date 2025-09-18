import React from "react";

const Card = ({ title, subtitle, children, actions, className = "" }) => (
  <section className={`glass relative z-10 rounded-2xl p-6 text-black shadow-glass ${className}`}>
    {(title || actions) && (
      <header className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          {title && <h2 className="text-xl font-semibold text-black">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-black">{subtitle}</p>}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
      </header>
    )}
    <div className="text-sm text-black">{children}</div>
  </section>
);

export default Card;
