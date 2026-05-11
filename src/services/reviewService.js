import api from "./api";

export const getProductReviewsAPI = async (productId) => {
  const { data } = await api.get(`/reviews/${productId}`);

  return data;
};

export const createReviewAPI = async (productId, reviewData) => {
  const { data } = await api.post(`/reviews/${productId}`, reviewData);

  return data;
};
