import api from "./api";

export const createCheckoutSessionAPI = async (orderId) => {
  const { data } = await api.post(
    `/payments/create-checkout-session/${orderId}`,
  );

  return data;
};

export const markOrderPaidAPI = async (orderId, paymentResult) => {
  const { data } = await api.put(`/payments/${orderId}/pay`, paymentResult);

  return data;
};
