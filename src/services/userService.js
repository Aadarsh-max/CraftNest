import api from "./api";

export const getSellerProfileAPI = async (id) => {
  const { data } = await api.get(`/users/seller/${id}`);

  return data;
};

export const getUserProfileAPI = async () => {
  const { data } = await api.get("/users/profile");

  return data;
};

export const updateUserProfileAPI = async (userData) => {
  const { data } = await api.put("/users/profile", userData);

  return data;
};
export const getAllSellersAPI = async () => {
  const { data } = await api.get("/users/sellers");

  return data;
};
