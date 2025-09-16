import React from "react";
import { Button, Card } from "../components/ui";

const SkuBrandsPage = () => {
  const brands = [
    { name: "Lays", items: 38, logo: "??" },
    { name: "Doritos", items: 22, logo: "??" },
    { name: "Kurkure", items: 19, logo: "???" },
    { name: "Pringles", items: 14, logo: "??" },
  ];

  return (
    <Card title="Brands" subtitle="All brands currently active in the app.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand) => (
          <div
            key={brand.name}
            className="rounded-lg border border-gray-200 bg-white p-4 hover:shadow-sm"
          >
            <div className="mb-2 text-3xl" aria-hidden="true">{brand.logo}</div>
            <div className="text-base font-semibold">{brand.name}</div>
            <div className="text-sm text-gray-500">{brand.items} SKUs</div>
            <div className="mt-3">
              <Button variant="soft">View SKUs</Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SkuBrandsPage;