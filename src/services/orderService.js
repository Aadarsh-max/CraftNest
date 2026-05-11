import api from "./api";

export const createOrderAPI = async (orderData) => {
  const { data } = await api.post("/orders", orderData);

  return data;
};

export const getMyOrdersAPI = async () => {
  const { data } = await api.get("/orders/my-orders");

  return data;
};

export const getOrderByIdAPI = async (id) => {
  const { data } = await api.get(`/orders/${id}`);

  return data;
};
