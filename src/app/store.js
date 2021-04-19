import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/token/tokenSlice";
import meReducer from "../features/me/meSlice";
// import usersReducer from "../features/users/usersSlice";
// import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    me: meReducer,
    // users: usersReducer,
    // posts: postsReducer,
  },
});
