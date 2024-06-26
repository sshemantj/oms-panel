import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {} from "@/services/thunks/tableApis";
import userChannelMappings from "@/jsons/GetUserChannelMappings.json";

export type IProducts = "";

type IGatewaySlice = {
  status: "loading" | "succeeded" | "failed";
  data: any;
  styleVariants: any;
  sizeVariants: any;
  channelMasters: any;
  userChannelMappings: any;
  selectedChannel: string;
  pdType: IProducts;
  error: string;
  isLoading: boolean;
};

const initialState = {
  // data: getApprovedUnmappedSizeVariants || tableJson,
  // styleVariants: styleVariantsJson,
  // sizeVariants: sizeVariantsJson,
  userChannelMappings: userChannelMappings,
  // channelMasters: channelMastersJson,
  //
  data: { sizevariantData: [] },
  styleVariants: [],
  sizeVariants: [],
  // userChannelMappings: [],
  channelMasters: [],
  //
  selectedChannel: "",
  pdType: "",
  error: "",
  isLoading: false,
} as IGatewaySlice;

export const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
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

export const { setLoader } = dashboardSlice.actions;
export default dashboardSlice.reducer;
