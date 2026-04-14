import axios from "axios";

// Base API instance
const API = axios.create({
baseURL: "http://localhost:8000/api/auth", 
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

// ================= AUTH API =================

// Signup
export const signup = async (data: {
name: string;
email: string;
password: string;
}) => {
const res = await API.post("/signup", data);

if (res.data.token) {
localStorage.setItem("token", res.data.token);
}

return res.data;
};

// Login
export const login = async (data: {
email: string;
password: string;
}) => {
const res = await API.post("/login", data);

if (res.data.token) {
localStorage.setItem("token", res.data.token);
}

return res.data;
};

// Forgot Password
export const forgotPassword = async (email: string) => {
const res = await API.post("/forgot-password", { email });
return res.data;
};

// Reset Password
export const resetPassword = async (data: {
email: string;
otp: string;
password: string;
}) => {
const res = await API.post("/reset-password", data);
return res.data;
};

// Logout
export const logout = async () => {
const res = await API.post("/logout");

localStorage.removeItem("token");

return res.data;
};

export default API;
