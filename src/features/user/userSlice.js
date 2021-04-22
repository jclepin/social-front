import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import connectApi from "../../api/connectApi";

const initialState = {
  token: "",
  me: {},
  friends: [],
};

export const loginAsync = createAsyncThunk("users/login", async (user) => {
  console.log("🚀 ~ file: userSlice.js ~ line 11 ~ loginAsync ~ user", user);
  return await connectApi(user);
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    deleteToken: (state) => {
      state.token = "";
    },
    addMe: (state, action) => {
      state.me = action.payload;
    },
    deleteMe: (state) => {
      state.me = {};
    },
    connect: (state, action) => {
      state.me = action.payload.me;
      state.token = action.payload.token;
      state.friends = [];
    },
    disconnect: (state) => {
      state.me = {};
      state.token = "";
      state.friends = [];
    },
    addFriend: (state, action) => {
      state.friends = [...state.friends, action.payload];
    },
    setFriends: (state, action) => {
      state.friends = action.payload;
    },
    deleteFriend: (state, action) => {
      const filteredFriends = state.value.friends.filter(
        (friend) => friend.id !== action.payload.id
      );
      state.friends = [...filteredFriends];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      console.log(
        "🚀 ~ file: userSlice.js ~ line 56 ~ builder.addCase ~ action",
        action
      );
      state.token = action.payload.token;
      state.me = action.payload.user;
      state.friends = action.payload.friends;
    });
  },
});

export const {
  addToken,
  deleteToken,
  addMe,
  deleteMe,
  addFriend,
  setFriends,
  deleteFriend,
  disconnect,
  connect,
} = userSlice.actions;

export const getToken = (state) => state.user.token;
export const getMe = (state) => state.user.me;
export const getFriends = (state) => state.user.friends;
export const getUser = (state) => state.user;

export default userSlice.reducer;
