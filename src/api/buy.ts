import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "http://localhost:8000/api", // 🔥 your backend base
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// ================= BUY PROPERTY API =================

// Buy Property
export const buyProperty = async (data: {
  propertyId: string;
  paymentMethod: "cash" | "loan";
}) => {
  const res = await API.post("/buy", data);
  return res.data;
};

// Get My Purchased Properties
export const getMyProperties = async () => {
  const res = await API.get("/buy/my-properties");
  return res.data;
};

export default API;