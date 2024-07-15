import {
  CourierPartnerData,
  HandoverData,
  WeightData,
} from "@/types/packTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosPublic } from "../client";

const packFilters = createAsyncThunk(
  "pack/PickFilters",
  async (locationId: number) => {
    try {
      const url = `/packer/Pack/getPackFilers?locationId=${locationId}`;

      const response = await axiosPublic.get(url);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const getPackStatusCount = createAsyncThunk(
  "pack/getPackStatusCount",
  async (locationId: number) => {
    try {
      const url = `/packer/Pack/getPackStatusCount?locationId=${locationId}`;

      const response = await axiosPublic.get(url);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const getPackItemDetails = createAsyncThunk(
  "pack/getPackItemDetails",
  async (packPayload: any, { rejectWithValue }) => {
    let data = packPayload;

    try {
      let config = {
        method: "post",
        url: `/api/getPackItemDetails`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios.request(config);
      console.log("response here", response);
      return response.data;
    } catch (error: any) {
      console.log("error in getpackdetails", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const getConsignmentsItem = createAsyncThunk(
  "pack/getConsignmentsItem",
  async ({ locationId, consignmentId }: any, { rejectWithValue }) => {
    const data = JSON.stringify({ locationId, consignmentId });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/api/getConsignmentItems`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getConsignmentCourierItems = createAsyncThunk(
  "pack/getConsignmentCourierItems",
  async ({ locationId, consignmentId }: any, { rejectWithValue }) => {
    const data = JSON.stringify({ locationId, consignmentId });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `/api/getConsignmentCourierItems`,
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };

    try {
      const response = await axios(config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateWeight = createAsyncThunk(
  "pack/updateWeight",
  async (weights: WeightData[], { rejectWithValue }) => {
    try {
      const data = JSON.stringify(weights);
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `packer/Pack/updateWeight`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      const response = await axiosPublic(config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const updatePackEntry = createAsyncThunk(
  "pack/updatePackEntry",
  async (weights: HandoverData, { rejectWithValue }) => {
    try {
      const data = JSON.stringify(weights);
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `packer/Pack/updatePackEntry`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      const response = await axiosPublic(config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchCourierData = createAsyncThunk(
  "courier/fetchCourierData",
  async () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "packer/Pack/getCourier",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axiosPublic(config);
    return response.data;
  }
);

export const updateCourierPartner = createAsyncThunk(
  "pack/updateCourierPartner",
  async (weights: CourierPartnerData[], { rejectWithValue }) => {
    try {
      const data = JSON.stringify(weights);
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `packer/Pack/updateWeight`,
        headers: { "Content-Type": "application/json" },
        data: data,
      };
      const response = await axiosPublic(config);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export { getPackItemDetails, getPackStatusCount, packFilters };
