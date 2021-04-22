import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/user/userSlice";
// import usersReducer from "../features/users/usersSlice";
// import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    // token: tokenReducer,
    // me: meReducer,
    // users: usersReducer,
    // posts: postsReducer,
  },
});
