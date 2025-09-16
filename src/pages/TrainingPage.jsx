import React, { useState } from "react";
import { Badge, Button, Card } from "../components/ui";
import SortableTable from "../components/tables/SortableTable";

const TrainingPage = () => {
  const [tab, setTab] = useState("batch");

  return (
    <Card
      title="Training"
      subtitle="Manage training pipelines and individual SKU training."
      actions={
        <div className="inline-flex rounded-lg bg-gray-100 p-1">
          {[
            { k: "batch", label: "Batch Training" },
            { k: "individual", label: "Individual SKU Training" },
          ].map((t) => (
            <button
              key={t.k}
              onClick={() => setTab(t.k)}
              className={px-3 py-1.5 text-sm rounded-md }
            >
              {t.label}
            </button>
          ))}
        </div>
      }
    >
      {tab === "batch" && <BatchTrainingPanel />}
      {tab === "individual" && <IndividualTrainingPanel />}
    </Card>
  );
};

const BatchTrainingPanel = () => {
  const rows = [
    { id: "BT-001", name: "June Week 2 Full Catalog", created: "2025-06-12", items: 1200, status: "Completed" },
    { id: "BT-002", name: "Snacks Brand Refresh", created: "2025-07-01", items: 420, status: "Running" },
  ];

  const columns = [
    { key: "id", header: "Batch ID" },
    { key: "name", header: "Batch Name" },
    { key: "created", header: "Created On" },
    { key: "items", header: "Items" },
    { key: "status", header: "Status" },
  ];

  return (
    <>
      <div className="mb-3 flex gap-2">
        <Button variant="soft">Upload CSV</Button>
        <Button>Start New Batch</Button>
      </div>
      <SortableTable columns={columns} rows={rows} />
    </>
  );
};

const IndividualTrainingPanel = () => {
  const rows = [
    { id: "SKU101", sku: "Lays Classic 52g", brand: "Lays", status: "Queued", last: "2025-07-07" },
    { id: "SKU142", sku: "Doritos Nacho 44g", brand: "Doritos", status: "Trained", last: "2025-07-02" },
  ];

  const columns = [
    { key: "id", header: "SKU ID" },
    { key: "sku", header: "SKU Name" },
    { key: "brand", header: "Brand" },
    {
      key: "status",
      header: "Training Status",
      render: (value) => <Badge tone={value === "Trained" ? "green" : "gray"}>{value}</Badge>,
    },
    { key: "last", header: "Last Trained" },
    {
      key: "act",
      header: "Actions",
      render: (_, row) => <Button variant="outline">Train</Button>,
    },
  ];

  return (
    <>
      <div className="mb-3 flex gap-2">
        <Button variant="soft">Upload Images</Button>
        <Button variant="soft">Link Ground Truth</Button>
      </div>
      <SortableTable columns={columns} rows={rows} />
    </>
  );
};

export default TrainingPage;