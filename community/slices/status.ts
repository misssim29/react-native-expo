import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  modal: false,
};
const statusSlice = createSlice({
  name: "status",
  initialState,
  reducers: {
    setLoggedIn(state, action) {
      state.loggedIn = action.payload;
    },
    setModal(state, action) {
      state.modal = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default statusSlice;
