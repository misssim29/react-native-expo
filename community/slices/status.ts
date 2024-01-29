import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loggedIn: false,
  modal: false,
  modalType: "",
  showMenu: false,
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
    setModalType(state, action) {
      state.modalType = action.payload;
    },
    setShowMenu(state, action) {
      state.showMenu = action.payload;
    },
  },
  extraReducers: (builder) => {},
});

export default statusSlice;
