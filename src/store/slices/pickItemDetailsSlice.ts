import { fetchPickItemDetails } from "@/services/thunks/pickApis";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  status: "idle",
  error: null,
  offset: 1,
  limit: 5,
};

const pickItemDetailsSlice = createSlice({
  name: "pickItemDetails",
  initialState,
  reducers: {
    resetState: (state) => {
      state.items = [];
      state.status = "idle";
      state.error = null;
      state.offset = 1;
    },
    incrementOffset: (state) => {
      state.offset += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPickItemDetails.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchPickItemDetails.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload || [];
        // state.items = [...action.payload] as any;
      })
      .addCase(fetchPickItemDetails.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload
          ? (action.payload as any)
          : "Something went wrong";
        // state.error = action.payload as any;
      });
  },
});

export const { resetState, incrementOffset } = pickItemDetailsSlice.actions;

export default pickItemDetailsSlice.reducer;
