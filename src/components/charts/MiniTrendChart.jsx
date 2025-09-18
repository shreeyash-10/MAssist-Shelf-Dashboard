import React from "react";

// Simple mini line chart for a single metric over months
const MiniTrendChart = ({ data, color = "var(--color-brand-300)", height = 120, label = "" }) => {
  const width = 360;
  const padding = 24;
  const points = data.map((d, i) => ({ x: i, y: d.value }));
  const maxY = Math.max(...points.map((p) => p.y), 1);
  const minY = Math.min(...points.map((p) => p.y), 0);
  const dx = (width - padding * 2) / Math.max(points.length - 1, 1);
  const dy = (height - padding * 2) / Math.max(maxY - minY || 1, 1);
  const path = points
    .map((p, i) => {
      const x = padding + i * dx;
      const y = height - padding - (p.y - minY) * dy;
      return `${i === 0 ? "M" : "L"}${x},${y}`;
    })
    .join(" ");

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-32 w-full" role="img" aria-label={label}>
      <rect x="0" y="0" width={width} height={height} fill="none" />
      <path d={path} fill="none" stroke={color} strokeWidth="3" />
    </svg>
  );
};

export default MiniTrendChart;
