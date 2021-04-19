import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "",
};

export const tokenSlice = createSlice({
  name: "token",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: (state, token) => {
      state.value = token;
    },
    destroy: (state) => {
      state.value = "";
    },
  },
});

export const { add, destroy } = tokenSlice.actions;

export const getToken = (state) => state.token.value.payload;

export default tokenSlice.reducer;
