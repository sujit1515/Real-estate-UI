import axios from "axios";
//TYPES

export interface ToggleResponse {
  success: boolean;
  action: "added" | "removed";
  message: string;
}
// ✅ Create Axios Instance here
const API = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Attach Token Automatically
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
//TOGGLE WISLIST
export const toggleWishlist = async (
  propertyId: string
): Promise<ToggleResponse> => {
  const res = await API.post("/wishlist/toggle", { propertyId });
  return res.data;
};

// Get All Wishlist
export const getWishlist = async () => {
  const res = await API.get("/wishlist");
  return res.data;
};

// Remove from Wishlist (optional)
export const removeFromWishlist = async (property: string) => {
  const res = await API.delete(`/wishlist/${property}`);
  return res.data;
};