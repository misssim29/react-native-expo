import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
};
const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default statusSlice;
