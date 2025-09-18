import React from "react";

const DetailRow = ({ label, value }) => (
  <div className="grid grid-cols-3">
    <div className="col-span-1 text-black">{label}</div>
    <div className="col-span-2 font-medium text-black">{value}</div>
  </div>
);

export default DetailRow;

