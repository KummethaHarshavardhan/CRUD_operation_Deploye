import axios from "axios";

// The backend base URL comes from REACT_APP_API_URL at build time.
// Set it in frontend/.env.production (or your hosting dashboard) before deploying, e.g.
//   REACT_APP_API_URL=https://your-backend.example.com/api/products
const DEV_FALLBACK = "http://localhost:5050/api/products";
const rawUrl = process.env.REACT_APP_API_URL;

if (!rawUrl && process.env.NODE_ENV === "production") {
  console.error("REACT_APP_API_URL is not set. API calls will fail in this production build.");
}

// Remove any trailing slash so requests like `${API_URL}/${id}` never produce "//".
const API_URL = (rawUrl || DEV_FALLBACK).replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

export const getProducts = () => api.get("/");
export const createProduct = (product) => api.post("/", product);
export const updateProduct = (id, product) => api.put(`/${id}`, product);
export const deleteProduct = (id) => api.delete(`/${id}`);

export default api;
