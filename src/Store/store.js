import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import workerReducer from "./WorkerSlice";

const store = configureStore({
  reducer: {
    login: authReducer,
    worker: workerReducer,
  },
});

export default store;
