import React from "react";
import { Badge } from "../ui";

const Kpi = ({ title, value, delta, negative = false }) => (
  <div className="rounded-lg border border-gray-200 p-4 dark:border-gray-700">
    <div className="text-sm text-gray-500 dark:text-gray-300">{title}</div>
    <div className="mt-1 flex items-baseline gap-2">
      <div className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{value}</div>
      <Badge tone={negative ? "red" : "green"}>{delta}</Badge>
    </div>
  </div>
);

export default Kpi;