import { callLogin, getUserDetails } from "@/services/thunks/loginApi";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IloginSlice {
  showLoginModal: boolean;
  status: "loading" | "succeeded" | "failed" | null;
  error: string | null;
  username: string;
  userDetails: any;
}

const initialState = {
  showLoginModal: false,
  status: null,
  error: null,
  username: "",
  userDetails: { userName: "" },
} as IloginSlice;

export const login = createSlice({
  name: "login",
  initialState,
  reducers: {
    openLoginModal: (state) => {
      // localStorage.clear();
      // state.showLoginModal = true;
    },
    closeLoginModal: (state) => {
      state.showLoginModal = false;
    },
    persistUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      // callLogin
      .addCase(callLogin.pending, (state) => {
        state.status = "loading";
      })
      .addCase(callLogin.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(callLogin.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "";
      })
      //getUserDetails
      .addCase(getUserDetails.fulfilled, (state, action) => {
        state.userDetails = action.payload;
      });
  },
});

export const { openLoginModal, closeLoginModal, persistUsername } =
  login.actions;
export default login.reducer;
