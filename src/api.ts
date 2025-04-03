import axios from "axios";

const apiUrl = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: apiUrl,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor - Attaches token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handles token expiration
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refresh_token = localStorage.getItem("refresh_token");
        if (!refresh_token) throw new Error("No refresh token found");

        const response = await axios.post(`${apiUrl}/auth/refresh`, { refresh_token });

        const { access_token } = response.data;

        localStorage.setItem("token", access_token);
        api.defaults.headers.Authorization = `Bearer ${access_token}`;

        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${access_token}`;
        return api.request(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);
        localStorage.removeItem("token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // Redirect to login on failure
      }
    }
    return Promise.reject(error);
  }
);

export default api;
