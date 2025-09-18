import client, { get, postFormData, postJSON } from "../lib/apiClient";
import apiRoutes from "./apiRoutes";

/**
 * Fetch HTML home response.
 * @returns {Promise<string>}
 */
export const fetchHome = () => client.request(apiRoutes.home, { method: "GET", headers: { Accept: "text/html" } });

/**
 * @param {File} file - Cropped product image.
 * @param {AbortSignal} [signal]
 */
export const searchSimilarImages = (file, signal) => {
  const formData = new FormData();
  formData.append("file", file);
  return postFormData(apiRoutes.search, formData, { signal });
};

/**
 * @param {{selected_product: string,total_facings_in_category:number,shelf_analysis_results:Object}} payload
 * @param {AbortSignal} [signal]
 */
export const calculateMetrics = (payload, signal) => postJSON(apiRoutes.calculateMetrics, payload, { signal });

/**
 * @param {string} productSku
 * @param {File[]} files
 * @param {AbortSignal} [signal]
 */
export const addNewProduct = (productSku, files, signal) => {
  const formData = new FormData();
  formData.append("product_sku", productSku);
  files.forEach((file) => formData.append("files", file));
  return postFormData(apiRoutes.addNewProduct, formData, { signal });
};

/**
 * @param {{
 *  file: File,
 *  planogramFile?: File,
 *  selectedProduct?: string,
 *  totalFacingsInCategory?: number,
 *  similarityThreshold?: number,
 *  positionTolerance?: number,
 * }} options
 * @param {AbortSignal} [signal]
 */
export const analyzeShelfWithPlanogram = (options, signal) => {
  const formData = new FormData();
  formData.append("file", options.file);
  if (options.planogramFile) {
    formData.append("planogram_file", options.planogramFile);
  }
  if (options.selectedProduct) {
    formData.append("selected_product", options.selectedProduct);
  }
  if (typeof options.totalFacingsInCategory === "number") {
    formData.append("total_facings_in_category", String(options.totalFacingsInCategory));
  }
  if (typeof options.similarityThreshold === "number") {
    formData.append("similarity_threshold", String(options.similarityThreshold));
  }
  if (typeof options.positionTolerance === "number") {
    formData.append("position_tolerance", String(options.positionTolerance));
  }
  return postFormData(apiRoutes.analyzeShelfWithPlanogram, formData, { signal });
};

export const fetchAnalysisReports = (signal) => get(apiRoutes.analysisReports, { signal });
export const fetchShelfAnalysisStatus = (signal) => get(apiRoutes.shelfAnalysisStatus, { signal });
export const fetchDebugDatabase = (signal) => get(apiRoutes.debugDatabase, { signal });
export const fetchProducts = (signal) => get(apiRoutes.products, { signal });
export const fetchImages = (signal) => get(apiRoutes.images, { signal });
export const fetchHealth = (signal) => get(apiRoutes.health, { signal });
export const fetchCroppingGuide = (signal) => get(apiRoutes.croppingGuide, { signal });

export default {
  fetchHome,
  searchSimilarImages,
  calculateMetrics,
  addNewProduct,
  analyzeShelfWithPlanogram,
  fetchAnalysisReports,
  fetchShelfAnalysisStatus,
  fetchDebugDatabase,
  fetchProducts,
  fetchImages,
  fetchHealth,
  fetchCroppingGuide,
};
