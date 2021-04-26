import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import connectApi from "./api/connectApi";
import addFriendApi from "./api/addFriendApi";
import getMeApi from "./api/getMeApi";

const initialState = {
  me: {},
  friends: [],
};

export const loginAsync = createAsyncThunk("users/login", async (user) => {
  return await connectApi(user);
});
export const getMeAsync = createAsyncThunk("users/me", async (token) => {
  const Me = await getMeApi(token);
  return Me;
});
export const addFriendAsync = createAsyncThunk(
  "users/addFriend",
  async ({ token, who }) => {
    return await addFriendApi({ token, who });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addMe: (state, action) => {
      state.me = action.payload;
    },
    deleteMe: (state) => {
      state.me = {};
    },
    connect: (state, action) => {
      state.me = action.payload.me;
      state.friends = [];
    },
    disconnect: (state) => {
      state.me = {};
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
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.me = action.payload.user;
        state.friends = action.payload.friends;
      })
      .addCase(getMeAsync.fulfilled, (state, action) => {
        state.me = action.payload.user;
        state.friends = action.payload.friends;
      })
      .addCase(addFriendAsync.fulfilled, (state, action) => {
        state.friends = action.payload.friends;
      });
  },
});

export const {
  addMe,
  deleteMe,
  addFriend,
  setFriends,
  deleteFriend,
  disconnect,
  connect,
} = userSlice.actions;

export const getMe = (state) => state.user.me;
export const getFriends = (state) => state.user.friends;
export const getUser = (state) => state.user;

export default userSlice.reducer;
