import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../slices/authSlices";
import userReducers from "../slices/userSlice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    user: userReducers,
  },
});
