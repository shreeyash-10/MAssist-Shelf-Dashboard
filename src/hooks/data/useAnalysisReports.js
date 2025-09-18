import { useEffect } from "react";
import useApiRequest from "../useApiRequest";
import { fetchAnalysisReports } from "../../services/apiService";

const fallback = [];

const useAnalysisReports = ({ enabled = true } = {}) => {
  const { data, error, loading, execute } = useApiRequest(fetchAnalysisReports);

  useEffect(() => {
    if (!enabled) return;
    execute().catch(() => {});
  }, [enabled, execute]);

  return {
    reports: Array.isArray(data) ? data : fallback,
    loading,
    error,
    refetch: execute,
  };
};

export default useAnalysisReports;
