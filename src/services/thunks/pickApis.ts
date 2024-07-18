import {
  ManualDropStatus,
  ProductDetails,
  SubmitFormData,
} from "@/types/productdetails";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosPublic } from "../client";

const pickFilters = createAsyncThunk(
  "pick/PickFilters",
  async (locationId: string) => {
    try {
      const url = `/picker/getPickFilers?locationId=${locationId}`;

      const response = await axiosPublic.get(url);

      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
const fetchPickItemDetails = createAsyncThunk(
  "pickItemDetails/fetchPickItemDetails",
  async ({ offset, limit, filters }: any) => {
    let data = { offset, limit, filters };

    let config = {
      method: "post",
      url: `/api/getPickItemDetails`,
      // url: `/picker/getPickItemDetails?offSet=${offset}&limit=${limit}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

const fetchProductDetails = createAsyncThunk<
  ProductDetails,
  { omsId: number; ean: string }
>(
  "productDetails/fetchProductDetails",
  async ({ omsId, ean }, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.get(
        `/picker/getProductDetails?omsId=${omsId}&ean=${ean}`
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
const submitFormData = createAsyncThunk(
  "form/submitFormData",
  async (formData: SubmitFormData, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(
        "/picker/updatePickEntry",
        formData,
        {
          headers: {
            "Accept-Encoding": "gzip,deflate,compress",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
const updateDropManualStatus = createAsyncThunk(
  "form/updateDropManualStatus",
  async (formData: ManualDropStatus, { rejectWithValue }) => {
    try {
      const response = await axiosPublic.post(
        "/picker/updatePickEntry",
        formData,
        {
          headers: {
            "Accept-Encoding": "gzip,deflate,compress",
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export {
  fetchPickItemDetails,
  fetchProductDetails,
  pickFilters,
  submitFormData,
  updateDropManualStatus,
};
