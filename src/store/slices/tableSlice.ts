import { initialAllTableState } from "@/constants/tableConstant";
import { IAllTableState } from "@/interfaces/home.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ITableSlice = {
  isLoading: boolean;
  data: IAllTableState;
  error: string;
};

const initialState = {
  isLoading: false,
  data: initialAllTableState,
  error: "",
} as ITableSlice;

export const tableStateSlice = createSlice({
  name: "tableState",
  initialState,
  reducers: {
    updateTableState: (state, action: PayloadAction<IAllTableState>) => {
      state.data = action.payload;
    },
    setLoader: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers(builder) {
    builder;
    // fetchTableData
    // .addCase(fetchTableData.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.data = action.payload;
    //   state.isLoading = false;
    // });
  },
});

export const { updateTableState, setLoader } = tableStateSlice.actions;
export default tableStateSlice.reducer;
