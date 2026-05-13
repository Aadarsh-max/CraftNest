import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  addToWishlistAPI,
  getWishlistAPI,
  removeFromWishlistAPI,
} from "../../services/wishlistService";

export const fetchWishlist = createAsyncThunk(
  "wishlist/fetchWishlist",
  async (_, thunkAPI) => {
    try {
      return await getWishlistAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch wishlist",
      );
    }
  },
);

export const addToWishlist = createAsyncThunk(
  "wishlist/addToWishlist",
  async (productId, thunkAPI) => {
    try {
      return await addToWishlistAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to add to wishlist",
      );
    }
  },
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/removeFromWishlist",
  async (productId, thunkAPI) => {
    try {
      return await removeFromWishlistAPI(productId);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to remove from wishlist",
      );
    }
  },
);

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState: {
    wishlist: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;

        state.wishlist = action.payload;
      })

      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      })

      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.wishlist = action.payload;
      });
  },
});

export default wishlistSlice.reducer;
