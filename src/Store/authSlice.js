import { createSlice } from "@reduxjs/toolkit";

// Retrieve user from localStorage (if exists)
const storedUser = JSON.parse(localStorage.getItem("user")) || null;

const authSlice = createSlice({
  name: "login",
  initialState: {
    user: storedUser, // Set initial state from localStorage
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // Save user in localStorage
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user"); // Remove from localStorage on logout
    },
    updateProfile(state, action) {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export const { login, logout ,updateProfile} = authSlice.actions;
export default authSlice.reducer;
