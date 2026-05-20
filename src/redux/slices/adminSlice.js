import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import {
  getAllUsersAPI,
  getAllProductsAPI,
  approveProductAPI,
  verifySellerAPI,
} from "../../services/adminService";

export const fetchAdminUsers = createAsyncThunk(
  "admin/fetchUsers",
  async (_, thunkAPI) => {
    try {
      return await getAllUsersAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch users",
      );
    }
  },
);

export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await getAllProductsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Failed to fetch products",
      );
    }
  },
);

export const approveProduct = createAsyncThunk(
  "admin/approveProduct",
  async (productId, thunkAPI) => {
    try {
      await approveProductAPI(productId);

      return productId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Approval failed",
      );
    }
  },
);

export const verifySeller = createAsyncThunk(
  "admin/verifySeller",
  async (sellerId, thunkAPI) => {
    try {
      await verifySellerAPI(sellerId);

      return sellerId;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Verification failed",
      );
    }
  },
);

const adminSlice = createSlice({
  name: "admin",

  initialState: {
    users: [],
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      // FETCH USERS

      .addCase(fetchAdminUsers.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminUsers.fulfilled, (state, action) => {
        state.loading = false;

        state.users = action.payload;
      })

      .addCase(fetchAdminUsers.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // FETCH PRODUCTS

      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchAdminProducts.fulfilled, (state, action) => {
        state.loading = false;

        state.products = action.payload;
      })

      .addCase(fetchAdminProducts.rejected, (state, action) => {
        state.loading = false;

        state.error = action.payload;
      })

      // APPROVE PRODUCT

      .addCase(approveProduct.fulfilled, (state, action) => {
        state.products = state.products.map((product) =>
          product._id === action.payload
            ? {
                ...product,
                isApproved: true,
              }
            : product,
        );
      })

      // VERIFY SELLER

      .addCase(verifySeller.fulfilled, (state, action) => {
        state.users = state.users.map((user) =>
          user._id === action.payload
            ? {
                ...user,
                isVerifiedSeller: true,
              }
            : user,
        );
      });
  },
});

export default adminSlice.reducer;
