import api from "./api";

export const fetchRecommendationsAPI =
  async (payload) => {
    const { data } = await api.post(
      "/ai/recommendations",
      payload
    );

    return data;
  };