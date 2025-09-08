import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpenBox: false, // sidebar yopiq bo'lsin default
  user: null,
  access: null,
  refresh: null,
};
const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpenBox = !state.isOpenBox;
    },

    setLocalStorageToken: (state, action) => {
      const { user, access, refresh } = action.payload;
      state.user = user;
      state.access = access;
      state.refresh = refresh;

      // localStorage ga ham yozib qo'yamiz
      if (access) localStorage.setItem("access", access);
      if (refresh) localStorage.setItem("refresh", refresh);
      if (user) localStorage.setItem("user", JSON.stringify(user));
    },
    removeLocalStorageToken: (state) => {
      state.user = null;
      state.access = null;
      state.refresh = null;

      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");
    },
    getLocalStorageToken: (state) => {
      const access = localStorage.getItem("access");
      const refresh = localStorage.getItem("refresh");
      const user = localStorage.getItem("user");

      if (access) state.access = access;
      if (refresh) state.refresh = refresh;
      if (user) state.user = JSON.parse(user);
    },
  },
});

export const {
  toggleSidebar,
  setLocalStorageToken,
  removeLocalStorageToken,
  getLocalStorageToken,
} = slice.actions;
export default slice.reducer;
