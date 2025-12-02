import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true,
});

// Auto-refresh logic
api.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    // If token expired → refresh
    if (err.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshRes = await api.get("/auth/refresh-token");
        const newToken = refreshRes.data.accessToken;

        localStorage.setItem("accessToken", newToken);

        // Add new token to the request and retry
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        return api(originalRequest);

      } catch (refreshErr) {
        console.log("Refresh failed");
      }
    }

    return Promise.reject(err);
  }
);

// Add token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) config.headers["Authorization"] = `Bearer ${token}`;
  return config;
});

export default api;
