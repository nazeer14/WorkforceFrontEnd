import { createSlice } from "@reduxjs/toolkit";

const workerSlice = createSlice({
  name: "worker",
  initialState: {
    list: [],
  },
  reducers: {
    setWorkers: (state, action) => {
      state.list = action.payload;
    },
    clearWorkers: (state) => {
      state.list = [];
    },
  },
});

export const { setWorkers, clearWorkers } = workerSlice.actions;
export default workerSlice.reducer;
