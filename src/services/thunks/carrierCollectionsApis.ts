import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../client";

interface FetchManifestDetailsParams {
  searchTerm?: string;
  filters?: {
    [key: string]: string;
  };
}

interface GenerateManifestOrderParams {
  manifestDetails: any[];
}

export const fetchManifestDetails = createAsyncThunk(
  "manifest/fetchManifestDetails",
  async (params?: FetchManifestDetailsParams) => {
    const { searchTerm, filters } = params || {};

    const isPayPickup = "1";

    let query = new URLSearchParams();
    if (searchTerm) query.append("searchTerm", searchTerm);
    query.append("isPayPickup", isPayPickup);
    if (filters) {
      Object.keys(filters).forEach((key) => {
        query.append(key, filters[key]);
      });
    }

    const queryString = query.toString();
    const url = `/packer/Pack/getManifestDetails${
      queryString ? `?${queryString}` : ""
    }`;

    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url,
      headers: {},
    };

    const response = await axiosPublic(config);
    return response.data;
  }
);
export const getChannels = createAsyncThunk("channel/getChannels", async () => {
  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: "packer/Pack/getChannels",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await axiosPublic(config);
  return response.data;
});

export const generateManifestOrder = createAsyncThunk(
  "manifest/generateManifestOrder",
  async (params: GenerateManifestOrderParams, { rejectWithValue }) => {
    try {
      const data = JSON.stringify(params.manifestDetails);
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "packer/Pack/generateManifestOrder",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json-patch+json",
        },
        data: data,
      };
      const response = await axiosPublic(config);
      return response.data;
    } catch (error: any) {
      throw new Error(`error in generateManifestOrder,${error.message}`);
    }
  }
);
