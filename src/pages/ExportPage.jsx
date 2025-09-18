import React from "react";
import { Icon } from "../components/icons";
import { Button, Card } from "../components/ui";
import SortableTable from "../components/tables/SortableTable";

const ExportPage = () => {
  const rows = [
    {
      id: "IMG001",
      store: "Big Bazaar",
      location: "Indore",
      user: "Priya Mehta",
      osa: 92,
      sos: 45,
      pgc: 60,
      date: "2025-07-08",
      status: "Processed",
    },
    {
      id: "IMG002",
      store: "Store A",
      location: "Mumbai",
      user: "Arjun Gupta",
      osa: 90,
      sos: 46,
      pgc: 62,
      date: "2025-07-09",
      status: "Queued",
    },
  ];

  const columns = [
    { key: "id", header: "Image ID" },
    { key: "store", header: "Store" },
    { key: "location", header: "Location" },
    { key: "user", header: "User" },
    { key: "osa", header: "OSA %", render: (value) => `${value}%` },
    { key: "sos", header: "SoS %", render: (value) => `${value}%` },
    { key: "pgc", header: "PGC %", render: (value) => `${value}%` },
    { key: "date", header: "Upload Date" },
    { key: "status", header: "Status" },
  ];

  return (
    <Card
      title="Export Dataset"
      subtitle="Download raw image recognition results filtered by date, store, user, or SKU."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Icon.calendar className="h-4 w-4" />
          </Button>
          <Button variant="primary" className="gap-2">
            <Icon.download className="h-5 w-5" /> Export
          </Button>
        </div>
      }
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {["Store", "Location", "User"].map((filter) => (
          <Button key={filter} variant="secondary" className="gap-1">
            {filter} <Icon.chevronDown className="h-4 w-4" />
          </Button>
        ))}
      </div>
      <SortableTable columns={columns} rows={rows} />
    </Card>
  );
};

export default ExportPage;
