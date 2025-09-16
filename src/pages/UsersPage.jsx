import React from "react";
import { Icon } from "../components/icons";
import { Badge, Button, Card } from "../components/ui";
import SortableTable from "../components/tables/SortableTable";

const badgeTone = (status) => {
  if (status === "Active") return "green";
  if (status === "Inactive") return "red";
  return "gray";
};

const UsersPage = () => {
  const rows = [
    { name: "Pooja Mehta", email: "pooja@company.com", role: "Admin", status: "Active", created: "2025-06-10" },
    { name: "Arjun Gupta", email: "arjun@company.com", role: "Manager", status: "Inactive", created: "2025-06-18" },
    { name: "Neha Rao", email: "neha@company.com", role: "Viewer", status: "Active", created: "2025-06-22" },
  ];

  const columns = [
    { key: "name", header: "Name" },
    { key: "email", header: "Email" },
    { key: "role", header: "Role" },
    {
      key: "status",
      header: "Status",
      render: (value) => <Badge tone={badgeTone(value)}>{value}</Badge>,
    },
    { key: "created", header: "Created On" },
    {
      key: "actions",
      header: "Actions",
      render: () => (
        <Button variant="outline" className="gap-1" aria-haspopup="menu" aria-expanded="false">
          Action <Icon.chevronDown className="h-4 w-4" />
        </Button>
      ),
    },
  ];

  return (
    <Card
      title="User Management"
      subtitle="Best and most commonly used. Clear and professional."
      actions={
        <div className="flex items-center gap-2">
          <Button variant="soft" className="gap-1">
            All <Icon.chevronDown className="h-4 w-4" />
          </Button>
          <Button className="gap-1">
            Add user <span className="ml-1" aria-hidden="true">+</span>
          </Button>
        </div>
      }
    >
      <SortableTable columns={columns} rows={rows} />
    </Card>
  );
};

export default UsersPage;