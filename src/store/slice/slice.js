import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutModal: false,
  addProducts: false,
  access: null,
};
const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLocalStorageToken: (state, action) => {
      const { access } = action.payload;

      state.access = access;
      if (access) localStorage.setItem("access", access);
    },

    removeLocalStorageToken: (state) => {
      state.access = null;
      localStorage.removeItem("access");
    },

    getLocalStorageToken: (state) => {
      const access = localStorage.getItem("access");
      if (access) state.access = access;
    },

    logoutModalFunction: (state) => {
      state.logoutModal = !state.logoutModal;
    },

    addProductsModal: (state) => {
      state.addProducts = !state.addProducts;
    },
  },
});

export const {
  setLocalStorageToken,
  removeLocalStorageToken,
  getLocalStorageToken,
  logoutModalFunction,
  addProductsModal,
} = slice.actions;
export default slice.reducer;
