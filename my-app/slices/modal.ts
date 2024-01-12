import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  onModal: false,
  ModalType: "",
  emailType: "",
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setModal(state, action) {
      state.onModal = action.payload;
    },
    setType(state, action) {
      state.ModalType = action.payload;
    },
    setEmail(state, action) {
      state.emailType = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default modalSlice;
