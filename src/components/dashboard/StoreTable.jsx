import React, { useMemo } from "react";
import SortableTable from "../tables/SortableTable";

const StoreTable = () => {
  const rows = useMemo(
    () => [
      { store: "Store A", city: "Mumbai", osa: 91.2, sos: 47.1, pgc: 80.2, images: 30 },
      { store: "Store B", city: "Delhi", osa: 88.4, sos: 45.0, pgc: 78.9, images: 26 },
      { store: "Store C", city: "Bengaluru", osa: 92.6, sos: 49.3, pgc: 83.1, images: 34 },
      { store: "Store D", city: "Kolkata", osa: 89.9, sos: 46.2, pgc: 79.5, images: 22 },
      { store: "Store E", city: "Chennai", osa: 90.1, sos: 44.8, pgc: 81.7, images: 28 },
      { store: "Store F", city: "Pune", osa: 87.5, sos: 43.5, pgc: 77.2, images: 20 },
      { store: "Store G", city: "Jaipur", osa: 93.1, sos: 48.6, pgc: 84.0, images: 36 },
    ],
    []
  );

  const columns = [
    { key: "store", header: "Store Name" },
    { key: "city", header: "City" },
    { key: "osa", header: "OSA %", render: (value) => `${value.toFixed(1)}%` },
    { key: "sos", header: "SoS %", render: (value) => `${value.toFixed(1)}%` },
    { key: "pgc", header: "PGC %", render: (value) => `${value.toFixed(1)}%` },
    { key: "images", header: "Images Uploaded" },
  ];

  return <SortableTable columns={columns} rows={rows} initialSort={{ key: "osa", dir: "desc" }} />;
};

export default StoreTable;