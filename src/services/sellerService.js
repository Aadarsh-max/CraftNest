import api from "./api";

export const getSellerProductsAPI = async () => {
  const { data } = await api.get("/products/seller/my-products");

  return data;
};

export const createProductAPI = async (productData) => {
  const { data } = await api.post("/products", productData);

  return data;
};

export const updateProductAPI = async ({ productId, productData }) => {
  const { data } = await api.put(`/products/${productId}`, productData);

  return data;
};

export const deleteProductAPI = async (productId) => {
  const { data } = await api.delete(`/products/${productId}`);

  return data;
};

export const getAllSellersAPI = async () => {
  const { data } = await api.get("/users/sellers");

  return data;
};
