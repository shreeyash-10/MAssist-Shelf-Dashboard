import React from "react";
import { Badge } from "../ui";

const Kpi = ({ title, value, delta, negative = false }) => (
  <div data-reveal className="glass rounded-2xl border border-black/15 bg-white p-5 opacity-0">
    <div className="text-sm">{title}</div>
    <div className="mt-3 flex items-baseline gap-3">
      <div className="text-3xl font-semibold">{value}</div>
      <Badge tone={negative ? "red" : "green"}>{delta}</Badge>
    </div>
  </div>
);

export default Kpi;
