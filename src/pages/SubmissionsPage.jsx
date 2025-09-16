import React from "react";
import { Icon } from "../components/icons";
import { Button, Card } from "../components/ui";
import SortableTable from "../components/tables/SortableTable";

const SubmissionsPage = () => {
  const rows = Array.from({ length: 8 }).map((_, index) => ({
    image: `https://picsum.photos/seed/sku${index}/160/100`,
    by: ["Priya Mehta", "Ankit Shah", "Kavya Iyer"][index % 3],
    store: ["Big Bazaar", "Store A", "Store B"][index % 3],
    date: "2025-06-10",
    osa: +(91 + (index % 3)).toFixed(1),
    sos: +(47 + (index % 4)).toFixed(1),
    pgc: +(78 + (index % 5)).toFixed(1),
  }));

  const columns = [
    {
      key: "image",
      header: "Image",
      render: (value) => <img src={value} alt="shelf" className="h-16 w-28 rounded object-cover" />,
    },
    { key: "by", header: "Uploaded By" },
    { key: "store", header: "Store Name" },
    { key: "date", header: "Upload Date" },
    { key: "osa", header: "OSA %", render: (value) => `${value}%` },
    { key: "sos", header: "SoS %", render: (value) => `${value}%` },
    { key: "pgc", header: "PGC %", render: (value) => `${value}%` },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <Button variant="outline" className="gap-1">
          Action <Icon.chevronDown className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <Card
      title="Image Submissions"
      subtitle="Review shelf images uploaded by field agents along with OSA, SoS, and Planogram metrics."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="soft">
            <Icon.calendar className="h-4 w-4" />
          </Button>
          <Button variant="soft" className="gap-1">
            Location <Icon.chevronDown className="h-4 w-4" />
          </Button>
        </div>
      }
    >
      <SortableTable columns={columns} rows={rows} />
    </Card>
  );
};

export default SubmissionsPage;