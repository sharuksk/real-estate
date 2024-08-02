import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../slices/authSlices";

export const store=configureStore({
    reducer:{
        auth:authReducers,
    }
});