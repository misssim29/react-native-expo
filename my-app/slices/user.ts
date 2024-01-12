import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  onLoading: false,
  userId: "",
  nickname: "",
  token: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.loggedIn = true;
      state.userId = action.payload.id;
      state.nickname = action.payload.nickname;
      state.token = action.payload.token;
    },
    setLoading(state, action) {
      state.onLoading = action.payload;
    },
    setLoggedOut(state) {
      state.loggedIn = false;
      state.userId = "";
      state.nickname = "";
      state.token = "";
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice;
