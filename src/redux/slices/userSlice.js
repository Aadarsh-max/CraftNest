import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  getSellerProfileAPI,
  getUserProfileAPI,
  updateUserProfileAPI,
} from "../../services/userService";

export const fetchSellerProfile = createAsyncThunk(
  "user/fetchSellerProfile",
  async (id, thunkAPI) => {
    try {
      return await getSellerProfileAPI(id);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch seller profile"
      );
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "user/fetchUserProfile",
  async (_, thunkAPI) => {
    try {
      return await getUserProfileAPI();
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch profile"
      );
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, thunkAPI) => {
    try {
      return await updateUserProfileAPI(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message ||
          "Failed to update profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",

  initialState: {
    seller: null,
    sellerProducts: [],
    profile: null,
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder

      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchSellerProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.seller = action.payload.seller;
          state.sellerProducts =
            action.payload.products;
        }
      )

      .addCase(
        fetchSellerProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        fetchUserProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )

      .addCase(
        fetchUserProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
      })

      .addCase(
        updateUserProfile.fulfilled,
        (state, action) => {
          state.loading = false;
          state.profile = action.payload;
        }
      )

      .addCase(
        updateUserProfile.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export default userSlice.reducer;