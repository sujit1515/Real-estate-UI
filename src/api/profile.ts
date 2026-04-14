import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000/api",
});

// Attach token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Get Profile
export const getProfile = async () => {
  const res = await API.get("/profile");
  return res.data;
};

// ✅ Update Profile
export const updateProfile = async (data: {
  name: string;
  phoneNo: string;
  location: string;
  occupation: string;
  company: string;
  bio: string;
}) => {
  const res = await API.put("/profile/update", data);
  return res.data;
};