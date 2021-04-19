import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: {},
};

export const meSlice = createSlice({
  name: "me",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addMe: (state, action) => {
      state.value = action.payload;
    },
    destroyMe: (state) => {
      state.value = {};
    },
  },
});

export const { addMe, destroyMe } = meSlice.actions;

export const getMe = (state) => state.me.value;

export default meSlice.reducer;
