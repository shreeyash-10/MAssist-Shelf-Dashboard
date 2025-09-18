import React from "react";
import { Button, Card } from "../components/ui";

const brands = [
  { name: "Lays", items: 38, logo: "🥔" },
  { name: "Doritos", items: 22, logo: "🔺" },
  { name: "Kurkure", items: 19, logo: "🌶️" },
  { name: "Pringles", items: 14, logo: "🟢" },
];

const SkuBrandsPage = ({ setPage, setSelectedBrand }) => {
  return (
    <Card title="Brands" subtitle="All brands currently active in the app.">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand) => (
          <div key={brand.name} className="glass rounded-2xl border border-black/15 bg-white p-5">
            <div className="mb-3 text-4xl" aria-hidden="true">
              {brand.logo}
            </div>
            <div className="text-base font-semibold">{brand.name}</div>
            <div className="text-sm">{brand.items} SKUs</div>
            <div className="mt-4">
              <Button
                variant="secondary"
                onClick={() => {
                  setSelectedBrand?.(brand.name);
                  setPage?.("skuTraining");
                }}
              >
                View SKUs
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default SkuBrandsPage;
