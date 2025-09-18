import { useEffect } from "react";
import useApiRequest from "../useApiRequest";
import { fetchProducts } from "../../services/apiService";

const fallback = [];

const useProducts = ({ enabled = true } = {}) => {
  const { data, error, loading, execute } = useApiRequest(fetchProducts);

  useEffect(() => {
    if (!enabled) return;
    execute().catch(() => {});
  }, [enabled, execute]);

  return {
    products: Array.isArray(data) ? data : fallback,
    loading,
    error,
    refetch: execute,
  };
};

export default useProducts;
