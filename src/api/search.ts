import axios from "axios";

// ================= AXIOS INSTANCE =================
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // optional (for auth cookies)
});

// ================= REQUEST INTERCEPTOR =================
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ================= RESPONSE INTERCEPTOR =================
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      console.log("Unauthorized - please login again");
    }

    return Promise.reject(error);
  }
);

// ================= SEARCH PROPERTIES =================
export const searchProperties = async (query: string) => {
  if (!query.trim()) return { properties: [] };

  const res = await API.get("/properties", {
    params: { search: query },
  });

  return res.data;
};