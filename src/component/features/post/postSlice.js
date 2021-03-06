import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import getPostApi from "./api/getPostApi";
import postPubApi from "./api/postPubApi";

const initialState = {
  posts: [],
};

export const getPostAsync = createAsyncThunk(
  "users/getPub",
  async ({ who }) => {
    return await getPostApi({ who });
  }
);
export const postPubAsync = createAsyncThunk(
  "users/postPub",
  async ({ titre, content, publique, parent, parent_user_id }) => {
    return await postPubApi({
      titre,
      content,
      publique,
      parent,
      parent_user_id,
    });
  }
);

export const postSlice = createSlice({
  name: "post",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getPostAsync.fulfilled, (slice, action) => {
        if (!action.payload.erreur) slice.posts = action.payload;
      })
      .addCase(postPubAsync.fulfilled, (slice, action) => {
        if (!action.payload.erreur) slice.posts = action.payload;
      });
  },
});

// export const {} = postSlice.actions;

export const getPosts = (state) => state.post.posts;

export default postSlice.reducer;
