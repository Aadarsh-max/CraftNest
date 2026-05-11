import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  createReviewAPI,
  getProductReviewsAPI,
} from "../../services/reviewService";

export const fetchReviews = createAsyncThunk(
  "review/fetchReviews",
  async (productId, thunkAPI) => {
    try {
      return await getProductReviewsAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch reviews",
      );
    }
  },
);

export const createReview = createAsyncThunk(
  "review/createReview",
  async ({ productId, reviewData }, thunkAPI) => {
    try {
      return await createReviewAPI(productId, reviewData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to create review",
      );
    }
  },
);

const reviewSlice = createSlice({
  name: "review",

  initialState: {
    reviews: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })

      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(createReview.fulfilled, (state, action) => {
        state.reviews.unshift(action.payload);
      });
  },
});

export default reviewSlice.reducer;
