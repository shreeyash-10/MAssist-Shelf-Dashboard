import React, { useMemo, useState } from "react";
import { Button } from "../ui";

const SortableTable = ({ columns, rows, initialSort, pageSize = 6, empty = "No data" }) => {
  const [sort, setSort] = useState(initialSort || { key: columns[0]?.key, dir: "asc" });
  const [page, setPage] = useState(1);

  const sorted = useMemo(() => {
    const next = [...rows];
    if (!sort?.key) return next;
    next.sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];
      if (typeof va === "number" && typeof vb === "number") {
        return sort.dir === "asc" ? va - vb : vb - va;
      }
      return sort.dir === "asc"
        ? String(va).localeCompare(String(vb))
        : String(vb).localeCompare(String(va));
    });
    return next;
  }, [rows, sort]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageRows = sorted.slice(start, start + pageSize);

  return (
    <div className="glass overflow-hidden rounded-2xl border border-white/12 bg-white/6">
      <table className="min-w-full divide-y divide-white/10 text-sm text-black">
        <thead className="bg-white/6 text-left text-xs font-semibold uppercase tracking-[0.2em] text-black">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-medium">
                <button
                  className="inline-flex items-center gap-1 text-black hover:text-black"
                  onClick={() =>
                    setSort((prev) => ({
                      key: column.key,
                      dir: prev.key === column.key && prev.dir === "asc" ? "desc" : "asc",
                    }))
                  }
                  aria-label={`Sort by ${column.header}`}
                >
                  {column.header}
                  {sort.key === column.key && (
                    <span className="text-xs text-black">{sort.dir === "asc" ? "â†‘" : "â†“"}</span>
                  )}
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/8 bg-white/4 text-sm text-black">
          {pageRows.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-black" colSpan={columns.length}>
                {empty}
              </td>
            </tr>
          )}
          {pageRows.map((row, rowIndex) => (
            <tr key={rowIndex} className="hover:bg-white/6">
              {columns.map((column) => (
                <td key={column.key} className="px-4 py-3">
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex items-center justify-between gap-3 bg-white/6 px-3 py-2 text-xs text-black">
        <span>
          Page {page} of {totalPages}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            disabled={page === 1}
          >
            Prev
          </Button>
          <Button
            variant="secondary"
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortableTable;


