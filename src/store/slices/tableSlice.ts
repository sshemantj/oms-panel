import { ITabList } from "@/interfaces/home.interface";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialAllTableState = {
  [ITabList.FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.STANDARD_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.EXPRESS_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.EXCHANGES_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.CLICK_AND_COLLECT]: { rows: [], columns: [] },
};

type ITableSlice = {
  isLoading: boolean;
  data: typeof initialAllTableState;
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
    updateTableState: (
      state,
      action: PayloadAction<typeof initialAllTableState>
    ) => {
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
