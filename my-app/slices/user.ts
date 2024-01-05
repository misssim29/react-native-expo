import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  onLoading: true,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice;
