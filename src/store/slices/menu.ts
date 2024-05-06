import { createSlice } from "@reduxjs/toolkit";

interface IMenu {
  showBackInNavbar: boolean | null;
}

const initialState = {
  showBackInNavbar: null,
} as IMenu;

export const menu = createSlice({
  name: "menu",
  initialState,
  reducers: {
    showBackNavbar: (state) => {
      state.showBackInNavbar = true;
    },
    hideBackNavbar: (state) => {
      state.showBackInNavbar = false;
    },
    resetNav: (state) => {
      state.showBackInNavbar = null;
    },
  },
});

export const { showBackNavbar, hideBackNavbar, resetNav } = menu.actions;
export default menu.reducer;
