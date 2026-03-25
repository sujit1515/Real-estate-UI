import axios from "axios";

// Base API instance
const API = axios.create({
  baseURL: "http://localhost:8000/api/sell/properties", 
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token automatically (for admin routes)
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


// ================= ROOM / SELL API =================

// ➤ Add Property (Admin)
export const addRoom = async (data: {
  title: string;
  location: string;
  city: string;
  state: string;
  zipCode: string;
  streetAddress: string;
  squareFeet: number;
  price: number;
  isAvailable?: boolean;
}) => {
  const res = await API.post("/add", data);
  return res.data;
};


// ➤ Get All Properties
export const getRooms = async () => {
  const res = await API.get("/");
  return res.data;
};


// ➤ Get Single Property
export const getRoomById = async (id: string) => {
  const res = await API.get(`/${id}`);
  return res.data;
};


// ➤ Update Property (Admin)
export const updateRoom = async (
  id: string,
  data: {
    title: string;
    location: string;
    city: string;
    state: string;
    zipCode: string;
    streetAddress: string;
    squareFeet: number;
    price: number;
    isAvailable?: boolean;
  }
) => {
  const res = await API.put(`/${id}`, data);
  return res.data;
};


// ➤ Delete Property (Admin)
export const deleteRoom = async (id: string) => {
  const res = await API.delete(`/${id}`);
  return res.data;
};


// ➤ Get Available Properties (Client)
export const getAvailableRooms = async () => {
  const res = await API.get("/available");
  return res.data;
};


// ➤ Update Availability (Admin)
export const updateAvailability = async (
  id: string,
  isAvailable: boolean
) => {
  const res = await API.patch(`/${id}/availability`, {
    isAvailable,
  });
  return res.data;
};

export default API;