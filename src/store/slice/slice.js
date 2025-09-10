import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logoutModal: false,
  addProducts: false,
  access: null,
  // user: null,
  // refresh: null,
};
const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setLocalStorageToken: (state, action) => {
      const { access } = action.payload;
      state.access = access;
      if (access) localStorage.setItem("access", access);

      // const { user, access, refresh } = action.payload;
      // state.user = user;
      // state.refresh = refresh;
      // localStorage ga ham yozib qo'yamiz
      // if (refresh) localStorage.setItem("refresh", refresh);
      // if (user) localStorage.setItem("user", JSON.stringify(user));
    },

    removeLocalStorageToken: (state) => {
      state.access = null;
      localStorage.removeItem("access");

      // state.user = null;
      // state.refresh = null;
      // localStorage.removeItem("refresh");
      // localStorage.removeItem("user");
    },

    getLocalStorageToken: (state) => {
      const access = localStorage.getItem("access");
      if (access) state.access = access;

      // const refresh = localStorage.getItem("refresh");
      // const user = localStorage.getItem("user");
      // if (refresh) state.refresh = refresh;
      // if (user) state.user = JSON.parse(user);
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
