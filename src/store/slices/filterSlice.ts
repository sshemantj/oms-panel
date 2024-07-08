import { pickFilters } from "@/services/thunks/pickApis";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type Brand = {};

type Channel = {
  channelId: number;
  channelName: string;
};

type PickStatus = {};

type DeliveryMode = {};

type DataType = {
  brands: Brand[];
  channels: Channel[];
  pickStatus: PickStatus[];
  deliveryMode: DeliveryMode[];
};

interface FiltersState {
  brand: string;
  category: string;
  channel: string;
  deliveryMode: string;
  estimatedShip: string;
  orderNumber: string;
  status: string;
  error: string | null;
  apiStatus: "loading" | "succeeded" | "failed" | null;
  pickFilters: DataType;
  selectedPickFilters: any;
}

const initialDataForPickFilters: DataType = {
  brands: [],
  channels: [],
  pickStatus: [],
  deliveryMode: [],
};

const initialState: FiltersState = {
  brand: "",
  category: "",
  channel: "",
  deliveryMode: "",
  estimatedShip: "",
  orderNumber: "",
  status: "",
  error: null,
  apiStatus: null,
  pickFilters: initialDataForPickFilters,
  selectedPickFilters: null,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setBrand: (state, action: PayloadAction<string>) => {
      state.brand = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setChannel: (state, action: PayloadAction<string>) => {
      state.channel = action.payload;
    },
    setDeliveryMode: (state, action: PayloadAction<string>) => {
      state.deliveryMode = action.payload;
    },
    setEstimatedShip: (state, action: PayloadAction<string>) => {
      state.estimatedShip = action.payload;
    },
    setOrderNumber: (state, action: PayloadAction<string>) => {
      state.orderNumber = action.payload;
    },
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
    setSelectedFiltersForLoadPick: (state, action: PayloadAction<any>) => {
      state.selectedPickFilters = action.payload;
    },
    deleteFilterItem: (state, action: PayloadAction<string>) => {
      const filterKey = action.payload; // e.g., "brand", "category", "channel", etc.
      delete state.selectedPickFilters[filterKey];
      // state.selectedPickFilters[filterKey] = { [`${filterKey}Id`]: "", [`${filterKey}Name`]: "" }; // reset to default
    },
  },
  extraReducers(builder) {
    builder
      // callLogin
      .addCase(pickFilters.pending, (state) => {
        state.apiStatus = "loading";
      })
      .addCase(pickFilters.fulfilled, (state, action) => {
        state.pickFilters = action.payload;
      })
      .addCase(pickFilters.rejected, (state, action) => {
        state.apiStatus = "failed";
        state.error = action.error.message || "";
      });
  },
});

export const {
  setBrand,
  setCategory,
  setChannel,
  setDeliveryMode,
  setEstimatedShip,
  setOrderNumber,
  setStatus,
  setSelectedFiltersForLoadPick,
  deleteFilterItem,
} = filterSlice.actions;

export default filterSlice.reducer;
