import axios from "axios";

// ✅ Create Axios Instance
const API = axios.create({
  baseURL: "http://localhost:8000/api", // change in production
  withCredentials: true,
});

// =============================
// 🏠 CREATE PROPERTY (SELL)
// =============================
export const addProperty = async (formData: FormData) => {
  try {
    const response = await API.post(
      "/sell/properties/create",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("Add Property Error:", error);
    throw error;
  }
};

// =============================
// 📦 GET ALL PROPERTIES
// =============================
export const getAllProperties = async () => {
  try {
    const res = await API.get("/properties");
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

// =============================
// 🔍 GET SINGLE PROPERTY
// =============================
export const getPropertyById = async (id: string) => {
  try {
    const res = await API.get(`/properties/${id}`);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

// =============================
// ❌ DELETE PROPERTY
// =============================
export const deleteProperty = async (id: string) => {
  try {
    const res = await API.delete(`/properties/${id}`);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};

// =============================
// ✏️ UPDATE PROPERTY
// =============================
export const updateProperty = async (
  id: string,
  formData: FormData
) => {
  try {
    const res = await API.put(
      `/properties/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return res.data;
  } catch (error: any) {
    throw error;
  }
};