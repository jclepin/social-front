import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../component/features/user/userSlice";
import postReducer from "../component/features/post/postSlice";
// import usersReducer from "../features/users/usersSlice";
// import postsReducer from "../features/posts/postsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    // token: tokenReducer,
    // me: meReducer,
    // users: usersReducer,
    // posts: postsReducer,
  },
});
