import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAllSellersAPI } from "../../services/sellerService";

export const fetchArtisans = createAsyncThunk(
  "artisan/fetchArtisans",
  async (_, thunkAPI) => {
    try {
      return await getAllSellersAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch artisans",
      );
    }
  },
);

const artisanSlice = createSlice({
  name: "artisan",

  initialState: {
    artisans: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchArtisans.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchArtisans.fulfilled, (state, action) => {
        state.loading = false;

        state.artisans = action.payload;
      })

      .addCase(fetchArtisans.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      });
  },
});

export default artisanSlice.reducer;
