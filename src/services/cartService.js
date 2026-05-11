import api from "./api";

export const getCartAPI = async () => {
  const { data } = await api.get("/cart");

  return data;
};

export const addToCartAPI = async (productId, quantity = 1) => {
  const { data } = await api.post("/cart", {
    productId,
    quantity,
  });

  return data;
};

export const updateCartQuantityAPI = async (productId, quantity) => {
  const { data } = await api.put(`/cart/${productId}`, {
    quantity,
  });

  return data;
};

export const removeFromCartAPI = async (productId) => {
  const { data } = await api.delete(`/cart/${productId}`);

  return data;
};
