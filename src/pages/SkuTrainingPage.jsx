import React, { useMemo, useState } from "react";
import { Icon } from "../components/icons";
import DetailRow from "../components/sku/DetailRow";
import SortableTable from "../components/tables/SortableTable";
import { Badge, Button, Card } from "../components/ui";
import useProducts from "../hooks/data/useProducts";

const fallbackRows = Array.from({ length: 8 }).map((_, index) => ({
  img: `https://picsum.photos/seed/lay${index}/160/100`,
  id: `SKU${String(index + 1).padStart(3, "0")}`,
  name: ["Lays Classic", "Lays Salt & Vinegar", "Lays Chile Limon"][index % 3],
  brand: "Lays",
  status: index % 4 === 0 ? "Queued" : "Trained",
  addedBy: ["Admin A", "Admin B"][index % 2],
  date: "2025-07-08",
}));

const mapProductsToRows = (products) =>
  products
    .filter((item) => item && typeof item === "object")
    .map((item, index) => ({
      img: item.preview ?? item.thumbnail ?? `https://picsum.photos/seed/product${index}/160/100`,
      id: item.sku ?? item.id ?? `SKU${index}`,
      name: item.name ?? item.title ?? "Unknown",
      brand: item.brand ?? "--",
      status: item.status ?? "Queued",
      addedBy: item.created_by ?? "System",
      date: item.created_at ?? "--",
    }));

const SkuTrainingPage = ({ setPage, selectedBrand }) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState({});
  const { products } = useProducts();

  const rows = useMemo(() => {
    const fromApi = mapProductsToRows(products);
    return fromApi.length > 0 ? fromApi : fallbackRows;
  }, [products]);

  const columns = [
    {
      key: "img",
      header: "SKU Image",
      render: (value) => <img src={value} alt="sku" className="h-16 w-28 rounded object-cover" />,
    },
    { key: "id", header: "SKU Id" },
    { key: "name", header: "SKU Name" },
    { key: "brand", header: "Brand Name" },
    {
      key: "status",
      header: "Training Status",
      render: (value) => <Badge>{value}</Badge>,
    },
    { key: "addedBy", header: "Added By" },
    { key: "date", header: "Created On" },
    {
      key: "actions",
      header: "Actions",
      render: (_, row) => (
        <Button
          variant="secondary"
          className="gap-1"
          onClick={() => {
            setActive(row);
            setOpen(true);
          }}
          aria-haspopup="dialog"
        >
          Action <Icon.chevronDown className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <>
      <Card
        title={`SKU Training${selectedBrand ? ` - ${selectedBrand}` : ""}`}
        subtitle="Upload, track, and train SKU data to improve recognition accuracy."
        actions={<Button onClick={() => setPage?.("trainingUpload")}>Upload Image</Button>}
      >
        <SortableTable columns={columns} rows={rows} />
      </Card>

      {open && (
        <div
          className="fixed inset-0 z-50 grid place-items-center bg-black/20 backdrop-blur-md p-4"
          role="dialog"
          aria-modal="true"
          onClick={() => setOpen(false)}
        >
          <div className="glass w-full max-w-3xl rounded-2xl border border-black/15 bg-white p-6 shadow-glass" onClick={(event) => event.stopPropagation()}>
            <div className="mb-6 flex items-start justify-between">
              <h3 className="text-lg font-semibold">SKU Training Details</h3>
              <Button variant="ghost" onClick={() => setOpen(false)} aria-label="Close">
                Close
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <img src={active.img} alt="sku" className="h-60 w-full rounded-2xl object-cover" />
              <div className="space-y-3 text-sm">
                <DetailRow label="SKU Id" value={active.id} />
                <DetailRow label="SKU Name" value={active.name} />
                <DetailRow label="Brand Name" value={active.brand} />
                <DetailRow label="Training Status" value={active.status} />
                <DetailRow label="Added By" value={active.addedBy} />
                <DetailRow label="Created On" value={active.date} />
                <div className="pt-2">
                  <Button variant="secondary" className="gap-2">
                    Action <Icon.chevronDown className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SkuTrainingPage;
