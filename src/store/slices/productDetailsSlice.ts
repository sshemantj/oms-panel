import { fetchProductDetails } from "@/services/thunks/pickApis";
import { ProductDetails, ProductDetailsState } from "@/types/productdetails";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState: ProductDetailsState = {
  data: null,
  loading: false,
  error: null,
};

const productDetailsSlice = createSlice({
  name: "productDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchProductDetails.fulfilled,
        (state, action: PayloadAction<ProductDetails>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productDetailsSlice.reducer;
