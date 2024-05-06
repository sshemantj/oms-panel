import { combineReducers } from "@reduxjs/toolkit";
import gatewaySlice from "./slices/gatewaySlice";
import menu from "./slices/menu";
import login from "./slices/loginSlice";

const rootReducer = combineReducers({
  menu,
  login,
  gateway: gatewaySlice,
});

export { rootReducer };
