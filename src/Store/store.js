import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"

const store = configureStore({
  reducer: {
    login: authReducer,
  },
});

export default store;
