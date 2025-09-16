import React from "react";

const Card = ({ title, subtitle, children, actions }) => (
  <section className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900">
    {(title || actions) && (
      <header className="mb-4 flex items-start justify-between gap-4">
        <div>
          {title && <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>}
          {subtitle && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
        </div>
        {actions}
      </header>
    )}
    {children}
  </section>
);

export default Card;