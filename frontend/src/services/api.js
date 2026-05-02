import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

// Attach token automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

console.log("API URL:", import.meta.env.VITE_API_URL);
export default API;