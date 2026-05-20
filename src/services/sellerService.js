import api from "./api";

export const getSellerProductsAPI = async () => {
  const { data } = await api.get("/products/seller/my-products");

  return data;
};

export const getSellerOrdersAPI = async () => {
  const { data } = await api.get("/orders/seller/orders");

  return data;
};
export const getAllSellersAPI = async () => {
  const { data } = await api.get("/users/sellers");

  return data;
};
