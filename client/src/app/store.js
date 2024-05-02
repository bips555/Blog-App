import { configureStore, createSlice } from "@reduxjs/toolkit";
import UserReducer from "./user/userSlice.js";

export const store = configureStore({
  reducer: {
    user: UserReducer,
  },
});
