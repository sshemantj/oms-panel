import { combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "./slices/dashboardSlice";
import menu from "./slices/menu";
import login from "./slices/loginSlice";
import tableSlice from "./slices/tableSlice";

const rootReducer = combineReducers({
  menu,
  login,
  tableState: tableSlice,
  dashboard: dashboardSlice,
});

export { rootReducer };
