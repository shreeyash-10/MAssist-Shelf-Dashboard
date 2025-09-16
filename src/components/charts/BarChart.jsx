import React from "react";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

const BarChart = ({ data }) => {
  const reduced = usePrefersReducedMotion();
  const max = 120;
  const height = 260;
  const paddingX = 24;
  const gap = 10;
  const barWidth = 42;
  const width = paddingX * 2 + data.length * (barWidth + gap);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-full">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-64 w-full"
          role="img"
          aria-label="Stacked bar chart of OSA, SoS and PGC by month"
        >
          <line x1={paddingX} y1={height - 20} x2={width - paddingX} y2={height - 20} stroke="#9ca3af" strokeWidth="1" />
          <g transform={`translate(${paddingX}, 12)`}>
            {[
              { label: "PGC", fill: "#84cc16" },
              { label: "SoS", fill: "#65a30d" },
              { label: "OSA", fill: "#3f6212" },
            ].map((legend, legendIndex) => (
              <g key={legend.label} transform={`translate(${legendIndex * 80},0)`}>
                <rect width="14" height="14" rx="2" fill={legend.fill} />
                <text x="20" y="12" className="fill-gray-600 dark:fill-gray-300 text-[12px]">
                  {legend.label}
                </text>
              </g>
            ))}
          </g>
          {data.map((entry, index) => {
            const x = paddingX + index * (barWidth + gap);
            const osaHeight = (entry.osa / max) * (height - 40);
            const sosHeight = (entry.sos / max) * (height - 40);
            const pgcHeight = (entry.pgc / max) * (height - 40);
            const pgcY = height - 20 - pgcHeight;
            const sosY = pgcY - sosHeight;
            const osaY = sosY - osaHeight;

            return (
              <g key={entry.month} tabIndex={0}>
                <title>{`${entry.month}: OSA ${entry.osa} | SoS ${entry.sos} | PGC ${entry.pgc}`}</title>
                <rect x={x} y={pgcY} width={barWidth} height={pgcHeight} rx="4" fill="#84cc16">
                  {!reduced && (
                    <animate attributeName="height" from="0" to={pgcHeight} dur="0.5s" begin="0s" fill="freeze" />
                  )}
                </rect>
                <rect x={x} y={sosY} width={barWidth} height={sosHeight} rx="4" fill="#65a30d">
                  {!reduced && (
                    <animate attributeName="height" from="0" to={sosHeight} dur="0.5s" begin="0.05s" fill="freeze" />
                  )}
                </rect>
                <rect x={x} y={osaY} width={barWidth} height={osaHeight} rx="4" fill="#3f6212">
                  {!reduced && (
                    <animate attributeName="height" from="0" to={osaHeight} dur="0.5s" begin="0.1s" fill="freeze" />
                  )}
                </rect>
                <text
                  x={x + barWidth / 2}
                  y={height - 4}
                  textAnchor="middle"
                  className="fill-gray-500 dark:fill-gray-400 text-[10px]"
                >
                  {entry.month}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};

export default BarChart;