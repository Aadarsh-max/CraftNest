import axios from "axios";

const API_URL = "https://craftnest-backend-eake.onrender.com/api/auth";

export const registerUserAPI = async (userData) => {
  const { data } = await axios.post(
    `${API_URL}/register`,
    userData
  );

  if (data.token) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }

  return data;
};

export const loginUserAPI = async (userData) => {
  const { data } = await axios.post(
    `${API_URL}/login`,
    userData
  );

  if (data.token) {
    localStorage.setItem("userInfo", JSON.stringify(data));
  }

  return data;
};

export const logoutUserAPI = () => {
  localStorage.removeItem("userInfo");
};