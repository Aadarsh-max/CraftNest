import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getAllProducts,
  getSingleProduct,
} from "../../services/productService";

export const fetchProducts = createAsyncThunk(
  "product/fetchProducts",
  async (filters = {}, thunkAPI) => {
    try {
      return await getAllProducts(filters);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch products"
      );
    }
  }
);

export const fetchSingleProduct = createAsyncThunk(
  "product/fetchSingleProduct",
  async (id, thunkAPI) => {
    try {
      return await getSingleProduct(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch product"
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",

  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })

      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchSingleProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchSingleProduct.fulfilled,
        (state, action) => {
          state.loading = false;
          state.product = action.payload;
        }
      )

      .addCase(
        fetchSingleProduct.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default productSlice.reducer;