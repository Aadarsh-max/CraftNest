import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import productReducer from "./slices/productSlice";
import adminReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    admin: adminReducer,
  },
});
