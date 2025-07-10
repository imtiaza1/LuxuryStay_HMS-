import axios from "axios";

// Get token from localStorage or context (adjust as needed)
const getToken = () => {
  return localStorage.getItem("token");
};

const api = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle unauthorized access
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized access - maybe token expired");
      // Optionally redirect to login or logout
    }

    // Show any other error messages
    return Promise.reject(error);
  }
);

export default api;
