import {
  submitFormData,
  updateDropManualStatus,
} from "@/services/thunks/pickApis";
import type { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

interface FormState {
  loading: boolean;
  error: string | null;
  success: boolean;
  dropStatusLoading: boolean;
  dropStatusError: string | null;
  dropStatussuccess: boolean;
}

const initialState: FormState = {
  loading: false,
  error: null,
  success: false,
  dropStatusLoading: false,
  dropStatusError: null,
  dropStatussuccess: false,
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
    resetDropStatusState: (state) => {
      state.dropStatusLoading = false;
      state.dropStatusError = null;
      state.dropStatussuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitFormData.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(submitFormData.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.success = true;
    });
    builder.addCase(submitFormData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
      state.success = false;
    });
    builder.addCase(updateDropManualStatus.pending, (state) => {
      state.dropStatusLoading = true;
      state.dropStatusError = null;
      state.dropStatussuccess = false;
    });
    builder.addCase(updateDropManualStatus.fulfilled, (state) => {
      state.dropStatusLoading = false;
      state.dropStatusError = null;
      state.dropStatussuccess = true;
    });
    builder.addCase(updateDropManualStatus.rejected, (state, action) => {
      state.dropStatusLoading = false;
      state.dropStatusError = action.payload as string;
      state.dropStatussuccess = false;
    });
  },
});

export const { resetState, resetDropStatusState } = formSlice.actions;

export const selectFormLoading = (state: RootState) => state.form.loading;
export const selectFormError = (state: RootState) => state.form.error;
export const selectFormSuccess = (state: RootState) => state.form.success;

export const selectDropStatusLoading = (state: RootState) =>
  state.form.dropStatusLoading;
export const selecDropStatusError = (state: RootState) =>
  state.form.dropStatusError;
export const selecDropStatusSuccess = (state: RootState) =>
  state.form.dropStatussuccess;

export default formSlice.reducer;
