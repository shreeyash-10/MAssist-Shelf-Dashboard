import React, { useState } from "react";
import AppLayout from "./components/layout/AppLayout";
import { ThemeProvider } from "./context/ThemeContext";
import DashboardPage from "./pages/DashboardPage";
import ExportPage from "./pages/ExportPage";
import LoginPage from "./pages/LoginPage";
import PlanogramPage from "./pages/PlanogramPage";
import StoreByStorePage from "./pages/StoreByStorePage";
import SubmissionsPage from "./pages/SubmissionsPage";
import TrainingPage from "./pages/TrainingPage";
import UsersPage from "./pages/UsersPage";
import SkuBrandsPage from "./pages/SkuBrandsPage";
import SkuTrainingPage from "./pages/SkuTrainingPage";
import TrainingUploadPage from "./pages/TrainingUploadPage";

const pageComponents = {
  dashboard: DashboardPage,
  users: UsersPage,
  submissions: SubmissionsPage,
  training: TrainingPage,
  trainingUpload: TrainingUploadPage,
  sku: SkuBrandsPage,
  skuTraining: SkuTrainingPage,
  storeByStore: StoreByStorePage,
  export: ExportPage,
  planogram: PlanogramPage,
};

const App = () => {
  const [authed, setAuthed] = useState(false);
  const [page, setPage] = useState("dashboard");
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedSku, setSelectedSku] = useState(null);

  if (!authed) {
    return (
      <ThemeProvider>
        <LoginPage onLogin={() => setAuthed(true)} />
      </ThemeProvider>
    );
  }

  const CurrentPage = pageComponents[page] || DashboardPage;

  return (
    <ThemeProvider>
      <AppLayout page={page} setPage={setPage}>
        <CurrentPage
          page={page}
          setPage={setPage}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedSku={selectedSku}
          setSelectedSku={setSelectedSku}
        />
      </AppLayout>
    </ThemeProvider>
  );
};

export default App;
