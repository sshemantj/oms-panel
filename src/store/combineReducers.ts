import { combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "./slices/dashboardSlice";
import menu from "./slices/menu";
import login from "./slices/loginSlice";

const rootReducer = combineReducers({
  menu,
  login,
  dashboard: dashboardSlice,
});

export { rootReducer };
