﻿const apiConfig = {
  baseUrl: import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000",
  defaultHeaders: {
    Accept: "application/json",
  },
};

export default apiConfig;
