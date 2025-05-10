import { createSlice } from "@reduxjs/toolkit";

const bookingsSlice = createSlice({
  name: "bookings",
  initialState: {
    list: [],
  },
  reducers: {
    setBookings: (state, action) => {
      state.list = action.payload;
    },
    clearBookings: (state) => {
      state.list = [];
    },
  },
});

export const { setBookings, clearBookings } = bookingsSlice.actions;
export default bookingsSlice.reducer;
