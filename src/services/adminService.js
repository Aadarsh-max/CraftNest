import api from "./api";

export const getAllUsersAPI = async () => {
  const { data } = await api.get("/admin/users");

  return data;
};

export const getAllProductsAPI = async () => {
  const { data } = await api.get("/admin/products");

  return data;
};

export const approveProductAPI = async (id) => {
  const { data } = await api.put(`/admin/products/${id}/approve`);

  return data;
};

export const verifySellerAPI = async (id) => {
  const { data } = await api.put(`/admin/users/${id}/verify`);

  return data;
};


