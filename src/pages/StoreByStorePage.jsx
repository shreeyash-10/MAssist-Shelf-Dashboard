import React, { useMemo, useState } from "react";
import { Card } from "../components/ui";
import SortableTable from "../components/tables/SortableTable";

const StoreByStorePage = () => {
  const [region, setRegion] = useState("All");
  const [city, setCity] = useState("All");

  const regions = ["All", "North", "South", "East", "West", "Central"];
  const cities = ["All", "Mumbai", "Delhi", "Bengaluru", "Kolkata", "Chennai", "Pune", "Jaipur"];

  const allStores = useMemo(
    () => [
      { store: "Store A", city: "Mumbai", region: "West", osa: 91.2, sos: 47.1, pgc: 80.2 },
      { store: "Store B", city: "Delhi", region: "North", osa: 88.4, sos: 45.0, pgc: 78.9 },
      { store: "Store C", city: "Bengaluru", region: "South", osa: 92.6, sos: 49.3, pgc: 83.1 },
      { store: "Store D", city: "Kolkata", region: "East", osa: 89.9, sos: 46.2, pgc: 79.5 },
      { store: "Store E", city: "Chennai", region: "South", osa: 90.1, sos: 44.8, pgc: 81.7 },
      { store: "Store F", city: "Pune", region: "West", osa: 87.5, sos: 43.5, pgc: 77.2 },
      { store: "Store G", city: "Jaipur", region: "West", osa: 93.1, sos: 48.6, pgc: 84.0 },
    ],
    []
  );

  const filtered = allStores.filter(
    (store) =>
      (region === "All" || store.region === region) &&
      (city === "All" || store.city === city)
  );

  const columns = [
    { key: "store", header: "Store" },
    { key: "city", header: "City" },
    { key: "region", header: "Region" },
    { key: "osa", header: "OSA %", render: (value) => ${value.toFixed(1)}% },
    { key: "sos", header: "SoS %", render: (value) => ${value.toFixed(1)}% },
    { key: "pgc", header: "PGC %", render: (value) => ${value.toFixed(1)}% },
  ];

  return (
    <Card
      title="Store-by-Store"
      subtitle="Browse all stores with regional and city filters."
      actions={
        <div className="flex gap-2">
          <select
            value={region}
            onChange={(event) => setRegion(event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            {regions.map((r) => (
              <option key={r} value={r}>
                {r} Regions
              </option>
            ))}
          </select>
          <select
            value={city}
            onChange={(event) => setCity(event.target.value)}
            className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          >
            {cities.map((c) => (
              <option key={c} value={c}>
                {c} Cities
              </option>
            ))}
          </select>
        </div>
      }
    >
      <SortableTable columns={columns} rows={filtered} />
    </Card>
  );
};

export default StoreByStorePage;