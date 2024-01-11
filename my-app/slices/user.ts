import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  onLoading: true,
  onModal: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.loggedIn = action.payload;
    },
    setModal(state, action) {
      state.onModal = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default userSlice;
