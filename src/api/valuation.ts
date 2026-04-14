import axios from "axios";

// ================= AXIOS INSTANCE =================
const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
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
    if (error.response?.status === 401) {
      console.log("Unauthorized - login again");
    }
    return Promise.reject(error);
  }
);

// ================= VALUATION API =================
export const createValuation = async (data: any) => {
  const res = await API.post("/valuation", data);
  return res.data;
};