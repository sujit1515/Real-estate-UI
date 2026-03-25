import axios from "axios";
import { Room } from "../types/room";

const API = axios.create({
  baseURL: "http://localhost:5000/api/rooms",
});

// Get all rooms
export const getRooms = () => API.get("/");

// Get single room
export const getRoom = (id: string) => API.get(`/${id}`);

// Add room
export const addRoom = (data: Room) => API.post("/add", data);

// Update room
export const updateRoom = (id: string, data: Room) =>
  API.put(`/${id}`, data);

// Delete room
export const deleteRoom = (id: string) =>
  API.delete(`/${id}`);