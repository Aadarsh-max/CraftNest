import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getSellerOrdersAPI,
  getSellerProductsAPI,
} from "../../services/sellerService";

export const fetchSellerProducts = createAsyncThunk(
  "seller/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await getSellerProductsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch seller products"
      );
    }
  }
);

export const fetchSellerOrders = createAsyncThunk(
  "seller/fetchOrders",
  async (_, thunkAPI) => {
    try {
      return await getSellerOrdersAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch seller orders"
      );
    }
  }
);

const sellerSlice = createSlice({
  name: "seller",

  initialState: {
    products: [],
    orders: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchSellerProducts.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products = action.payload;
        }
      )

      .addCase(
        fetchSellerProducts.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchSellerOrders.fulfilled,
        (state, action) => {
          state.loading = false;
          state.orders = action.payload;
        }
      )

      .addCase(
        fetchSellerOrders.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default sellerSlice.reducer;