import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import workerReducer from "./WorkerSlice";
import bookingsReducer from "./bookingsSlice"

const store = configureStore({
  reducer: {
    login: authReducer,
    worker: workerReducer,
    bookings: bookingsReducer,
  },
});

export default store;
