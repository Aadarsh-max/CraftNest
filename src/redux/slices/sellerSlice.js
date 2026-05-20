import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  createProductAPI,
  deleteProductAPI,
  getSellerProductsAPI,
  updateProductAPI,
} from "../../services/sellerService";

export const fetchSellerProducts =
  createAsyncThunk(
    "seller/fetchProducts",
    async (_, thunkAPI) => {
      try {
        return await getSellerProductsAPI();
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to fetch seller products"
        );
      }
    }
  );

export const createProduct =
  createAsyncThunk(
    "seller/createProduct",
    async (
      productData,
      thunkAPI
    ) => {
      try {
        return await createProductAPI(
          productData
        );
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to create product"
        );
      }
    }
  );

export const updateProduct =
  createAsyncThunk(
    "seller/updateProduct",
    async (
      {
        productId,
        productData,
      },
      thunkAPI
    ) => {
      try {
        return await updateProductAPI({
          productId,
          productData,
        });
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to update product"
        );
      }
    }
  );

export const deleteProduct =
  createAsyncThunk(
    "seller/deleteProduct",
    async (
      productId,
      thunkAPI
    ) => {
      try {
        await deleteProductAPI(
          productId
        );

        return productId;
      } catch (error) {
        return thunkAPI.rejectWithValue(
          error.response?.data
            ?.message ||
            "Failed to delete product"
        );
      }
    }
  );

const sellerSlice = createSlice({
  name: "seller",

  initialState: {
    products: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(
        fetchSellerProducts.pending,
        (state) => {
          state.loading = true;
        }
      )

      .addCase(
        fetchSellerProducts.fulfilled,
        (state, action) => {
          state.loading = false;

          state.products =
            action.payload;
        }
      )

      .addCase(
        fetchSellerProducts.rejected,
        (state, action) => {
          state.loading = false;

          state.error =
            action.payload;
        }
      )

      .addCase(
        createProduct.fulfilled,
        (state, action) => {
          state.products.unshift(
            action.payload
          );
        }
      )

      .addCase(
        updateProduct.fulfilled,
        (state, action) => {
          state.products =
            state.products.map(
              (product) =>
                product._id ===
                action.payload._id
                  ? action.payload
                  : product
            );
        }
      )

      .addCase(
        deleteProduct.fulfilled,
        (state, action) => {
          state.products =
            state.products.filter(
              (product) =>
                product._id !==
                action.payload
            );
        }
      );
  },
});

export default sellerSlice.reducer;