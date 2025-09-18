import React, { useState } from "react";
import { Badge, Button, Card } from "../components/ui";
import Pill from "../components/ui/Pill";
import SortableTable from "../components/tables/SortableTable";

const TrainingPage = ({ setPage, setSelectedSku }) => {
  const [tab, setTab] = useState("batch");

  return (
    <Card
      title="Training"
      subtitle="Manage training pipelines and individual SKU training."
      actions={
        <div className="flex flex-wrap gap-2">
          {[
            { k: "batch", label: "Batch Training" },
            { k: "individual", label: "Individual SKU Training" },
          ].map((t) => (
            <Pill key={t.k} active={tab === t.k} onClick={() => setTab(t.k)}>
              {t.label}
            </Pill>
          ))}
        </div>
      }
    >
      {tab === "batch" && <BatchTrainingPanel />}
      {tab === "individual" && (
        <IndividualTrainingPanel
          onUpload={(skuRow) => {
            setSelectedSku?.(skuRow || null);
            setPage?.("trainingUpload");
          }}
        />
      )}
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
      <div className="mb-3 flex flex-wrap gap-2">
        <Button variant="secondary" onClick={() => alert("Upload CSV (placeholder)")}>Upload CSV</Button>
        <Button onClick={() => alert("Starting new batch (placeholder)")}>Start New Batch</Button>
      </div>
      <SortableTable columns={columns} rows={rows} />
    </>
  );
};

const IndividualTrainingPanel = ({ onUpload }) => {
  const [selected, setSelected] = useState(null);
  const rows = [
    { id: "SKU101", sku: "Lays Classic 52g", brand: "Lays", status: "Queued", last: "2025-07-07" },
    { id: "SKU142", sku: "Doritos Nacho 44g", brand: "Doritos", status: "Trained", last: "2025-07-02" },
  ];
  const columns = [
    {
      key: "sel",
      header: "Select",
      render: (_, row) => (
        <Pill
          as="button"
          active={selected?.id === row.id}
          className="!px-3 !py-2 text-[0.7rem] tracking-[0.2em]"
          onClick={() => setSelected(row)}
        >
          {selected?.id === row.id ? "Selected" : "Select"}
        </Pill>
      ),
    },
    { key: "id", header: "SKU ID" },
    { key: "sku", header: "SKU Name" },
    { key: "brand", header: "Brand" },
    {
      key: "status",
      header: "Training Status",
      render: (v) => <Badge tone={v === "Trained" ? "green" : "gray"}>{v}</Badge>,
    },
    { key: "last", header: "Last Trained" },
    {
      key: "act",
      header: "Actions",
      render: (_, row) => (
        <Button variant="outline" onClick={() => alert(`Training started for ${row.sku}`)}>Train</Button>
      ),
    },
  ];
  return (
    <>
      <div className="mb-3 flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={() => {
            if (!selected) {
              alert("Please select a SKU first.");
              return;
            }
            onUpload?.(selected);
          }}
        >
          Upload Images
        </Button>
        <Button variant="secondary" onClick={() => alert("Linking ground truth (placeholder)")}>Link Ground Truth</Button>
      </div>
      <SortableTable columns={columns} rows={rows} />
    </>
  );
};

export default TrainingPage;
