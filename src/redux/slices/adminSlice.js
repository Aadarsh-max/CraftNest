import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

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
        error.response?.data?.message ||
          "Failed to fetch users"
      );
    }
  }
);

export const fetchAdminProducts = createAsyncThunk(
  "admin/fetchProducts",
  async (_, thunkAPI) => {
    try {
      return await getAllProductsAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    }
  }
);

export const approveProduct = createAsyncThunk(
  "admin/approveProduct",
  async (id, thunkAPI) => {
    try {
      await approveProductAPI(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Approval failed"
      );
    }
  }
);

export const verifySeller = createAsyncThunk(
  "admin/verifySeller",
  async (id, thunkAPI) => {
    try {
      await verifySellerAPI(id);

      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Verification failed"
      );
    }
  }
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

      .addCase(fetchAdminProducts.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchAdminProducts.fulfilled,
        (state, action) => {
          state.loading = false;
          state.products = action.payload;
        }
      )

      .addCase(
        fetchAdminProducts.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(approveProduct.fulfilled, (state, action) => {
        const product = state.products.find(
          (item) => item._id === action.payload
        );

        if (product) {
          product.isApproved = true;
        }
      })

      .addCase(verifySeller.fulfilled, (state, action) => {
        const seller = state.users.find(
          (item) => item._id === action.payload
        );

        if (seller) {
          seller.isVerifiedSeller = true;
        }
      });
  },
});

export default adminSlice.reducer;