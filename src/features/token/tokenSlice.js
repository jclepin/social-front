import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: (state, action) => {
      state.value = action.payload;
    },
    destroy: (state) => {
      state.value = "";
    },
  },
});

export const { add, destroy } = tokenSlice.actions;

export const getToken = (state) => state.token.value;

export default tokenSlice.reducer;
