import React from "react";

const IllustrationFrame = () => (
  <div className="relative h-80 w-96" aria-hidden="true">
    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-red-600/10 to-gray-900/5 dark:from-red-600/20" />
    <div className="absolute inset-6 rounded-2xl border-8 border-gray-800 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
      <div className="absolute -right-8 -top-6 h-20 w-28 rotate-6 rounded-xl border-8 border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900" />
      <div className="absolute -right-14 top-6 h-20 w-28 rotate-6 rounded-xl border-8 border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-900" />
      <div className="absolute left-6 top-6 h-40 w-64 rounded-lg bg-red-600" />
      <div className="absolute bottom-8 right-8 h-20 w-24 rounded-md bg-red-500" />
    </div>
    <span className="absolute -bottom-6 right-8 h-6 w-10 rounded-full bg-green-500" />
  </div>
);

export default IllustrationFrame;