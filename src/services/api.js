import axios from "axios";

const api = axios.create({
  baseURL: "https://craftnest-backend-eake.onrender.com/api",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }

  return config;
});

export default api;