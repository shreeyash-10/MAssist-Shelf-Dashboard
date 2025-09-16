import React from "react";
import { Icon } from "../components/icons";
import { Button, Card } from "../components/ui";
import BarChart from "../components/charts/BarChart";
import Kpi from "../components/dashboard/Kpi";
import StoreTable from "../components/dashboard/StoreTable";

const DashboardPage = () => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const data = months.map((month, index) => ({
    month,
    pgc: 60 + (index % 5) * 5,
    sos: 35 + ((index + 2) % 6) * 4,
    osa: 20 + ((index + 4) % 5) * 6,
  }));

  return (
    <div className="space-y-6">
      <Card
        title="Shelf Performance Overview"
        actions={
          <div className="flex items-center gap-2">
            <Button variant="soft" className="gap-1">
              <span className="text-sm">Dec 20 – Dec 31</span>
              <Icon.calendar className="h-4 w-4" />
            </Button>
            <Button variant="soft" className="gap-1">
              This Week <Icon.chevronDown className="h-4 w-4" />
            </Button>
          </div>
        }
      >
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Kpi title="OSA %" value="92%" delta="+5.2%" />
          <Kpi title="SoS %" value="47%" delta="-3.4%" negative />
          <Kpi title="Planogram Compliance (PGC) %" value="88%" delta="+2.1%" />
        </div>
        <BarChart data={data} />
      </Card>

      <Card
        title="Store-wise Shelf Performance"
        subtitle="View detailed OSA, SoS, and Planogram Compliance across all stores."
      >
        <StoreTable />
      </Card>
    </div>
  );
};

export default DashboardPage;