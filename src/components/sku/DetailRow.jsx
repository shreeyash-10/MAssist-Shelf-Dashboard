import React from "react";

const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-3">
    <div className="col-span-1 text-gray-500 dark:text-gray-300">{label}</div>
    <div className="col-span-2 font-medium text-gray-800 dark:text-gray-100">{value}</div>
  </div>
);

export default DetailRow;