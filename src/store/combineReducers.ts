import { combineReducers } from "@reduxjs/toolkit";
import dashboardSlice from "./slices/dashboardSlice";
import filterSlice from "./slices/filterSlice";
import formSlice from "./slices/formSlice";
import login from "./slices/loginSlice";
import menu from "./slices/menu";
import pickItemDetailsSlice from "./slices/pickItemDetailsSlice";
import productDetailsSlice from "./slices/productDetailsSlice";
import tableSlice from "./slices/tableSlice";

const rootReducer = combineReducers({
  menu,
  login,
  tableState: tableSlice,
  dashboard: dashboardSlice,
  filters: filterSlice,
  pickItemDetails: pickItemDetailsSlice,
  productDetails: productDetailsSlice,
  form: formSlice,
});

export { rootReducer };
