import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  notifications: null
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
        state.user = action.payload;
    },

    updateUserArray: (state, action) => {
        const { field, value } = action.payload
        state.user = {
          ...state.user,
          [field]: value
        }
    },
  },
});

export const { setUser, updateUserArray } = authSlice.actions;
export default authSlice.reducer; 