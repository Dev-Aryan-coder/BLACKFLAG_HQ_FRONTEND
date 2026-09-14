import axios from "axios";

// Axios instance configured for Spring Boot backend with X-Auth-Token session auth
const apiClient = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Intercept requests to attach session token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("bf_token");
    if (token) {
      config.headers["X-Auth-Token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Intercept responses to handle 401/session expiry
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Session expired or invalid
      localStorage.removeItem("bf_token");
      localStorage.removeItem("bf_user");
    }
    return Promise.reject(error);
  }
);

export default apiClient;
