import React, { useMemo, useState } from "react";
import { Icon } from "../components/icons";
import { Button, Card } from "../components/ui";
import SortableTable from "../components/tables/SortableTable";
import useAnalysisReports from "../hooks/data/useAnalysisReports";

const fallbackRows = Array.from({ length: 8 }).map((_, index) => ({
  image: `https://picsum.photos/seed/sku${index}/160/100`,
  by: ["Priya Mehta", "Ankit Shah", "Kavya Iyer"][index % 3],
  store: ["Big Bazaar", "Store A", "Store B"][index % 3],
  date: "2025-06-10",
  osa: +(91 + (index % 3)).toFixed(1),
  sos: +(47 + (index % 4)).toFixed(1),
  pgc: +(78 + (index % 5)).toFixed(1),
  city: ["Mumbai", "Delhi", "Bengaluru"][index % 3],
}));

const mapReportsToRows = (reports) =>
  reports
    .filter((item) => item && typeof item === "object")
    .map((item, index) => ({
      image: item.image_url ?? item.thumbnail ?? `https://picsum.photos/seed/api${index}/160/100`,
      by: item.uploaded_by ?? item.user ?? "Unknown",
      store: item.store ?? item.store_name ?? "Unknown Store",
      date: item.date ?? item.created_at ?? "--",
      osa: Number(item.osa ?? item.osa_percentage ?? 0),
      sos: Number(item.sos ?? item.sos_percentage ?? 0),
      pgc: Number(item.pgc ?? item.planogram ?? 0),
      city: item.city ?? "All Locations",
    }));

const SubmissionsPage = () => {
  const [locationOpen, setLocationOpen] = useState(false);
  const [location, setLocation] = useState("All Locations");
  const [actionOpenIndex, setActionOpenIndex] = useState(null);
  const { reports, loading } = useAnalysisReports();

  const apiRows = useMemo(() => mapReportsToRows(reports), [reports]);
  const baseRows = apiRows.length > 0 ? apiRows : fallbackRows;

  const locations = useMemo(() => {
    const uniqueCities = new Set(baseRows.map((row) => row.city || "All Locations"));
    return ["All Locations", ...Array.from(uniqueCities).filter((city) => city !== "All Locations")];
  }, [baseRows]);

  const rows = baseRows.filter((row) => location === "All Locations" || row.city === location);

  const columns = [
    {
      key: "image",
      header: "Image",
      render: (value) => <img src={value} alt="shelf" className="h-16 w-28 rounded object-cover" />,
    },
    { key: "by", header: "Uploaded By" },
    { key: "store", header: "Store Name" },
    { key: "date", header: "Upload Date" },
    { key: "osa", header: "OSA %", render: (value) => `${Number(value).toFixed(1)}%` },
    { key: "sos", header: "SoS %", render: (value) => `${Number(value).toFixed(1)}%` },
    { key: "pgc", header: "PGC %", render: (value) => `${Number(value).toFixed(1)}%` },
    {
      key: "actions",
      header: "Actions",
      render: (_, row, idx) => (
        <div className="relative inline-block">
          <Button
            variant="secondary"
            className="gap-1"
            onClick={() => setActionOpenIndex(actionOpenIndex === idx ? null : idx)}
            aria-expanded={actionOpenIndex === idx}
          >
            Action <Icon.chevronDown className="h-4 w-4" />
          </Button>
          {actionOpenIndex === idx && (
            <div className="glass absolute right-0 z-10 mt-1 w-40 rounded-xl border border-black/15 bg-white p-1">
              {[
                { k: "approve", label: "Approve" },
                { k: "reject", label: "Reject" },
                { k: "view", label: "View" },
              ].map((a) => (
                <button
                  key={a.k}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-black/5"
                  onClick={() => {
                    setActionOpenIndex(null);
                    alert(`${a.label} ${row.store} - ${row.city}`);
                  }}
                >
                  {a.label}
                </button>
              ))}
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Card
      title="Image Submissions"
      subtitle="Review shelf images uploaded by field agents along with OSA, SoS, and Planogram metrics."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="secondary">
            <Icon.calendar className="h-4 w-4" />
          </Button>
          <div className="relative">
            <Button
              variant="secondary"
              className="gap-1"
              onClick={() => setLocationOpen((value) => !value)}
              aria-expanded={locationOpen}
            >
              {location} <Icon.chevronDown className="h-4 w-4" />
            </Button>
            {locationOpen && (
              <div className="glass absolute right-0 z-10 mt-1 w-48 rounded-xl border border-black/15 bg-white p-1">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-black/5"
                    onClick={() => {
                      setLocation(loc);
                      setLocationOpen(false);
                    }}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      }
    >
      <SortableTable columns={columns} rows={rows} />
      {loading && <div className="mt-3 text-sm">Syncing with analysis service…</div>}
    </Card>
  );
};

export default SubmissionsPage;
