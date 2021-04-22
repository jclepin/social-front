import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postPubApi from "../../api/postPubApi";

const initialState = {
  posts: [],
};

export const postPubAsync = createAsyncThunk(
  "users/postPub",
  async ({ token, titre, content, publique }) => {
    return await postPubApi({ token, titre, content, publique });
  }
);

export const userSlice = createSlice({
  name: "post",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postPubAsync.fulfilled, (state, action) => {
      state.posts = action.payload.posts;
    });
  },
});

export const getPosts = (state) => state.post.posts;

export default userSlice.reducer;
