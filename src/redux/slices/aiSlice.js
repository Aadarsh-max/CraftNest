import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  fetchRecommendationsAPI,
} from "../../services/aiService";

export const fetchRecommendations =
  createAsyncThunk(
    "ai/fetchRecommendations",
    async (payload, thunkAPI) => {
      try {
        return await fetchRecommendationsAPI(
          payload
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch recommendations"
        );
      }
    }
  );

const aiSlice = createSlice({
  name: "ai",

  initialState: {
    recommendations: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchRecommendations.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchRecommendations.fulfilled,
        (state, action) => {
          state.loading = false;

          state.recommendations =
            action.payload;
        }
      )

      .addCase(
        fetchRecommendations.rejected,
        (state, action) => {
          state.loading = false;

          state.error = action.payload;
        }
      );
  },
});

export default aiSlice.reducer;