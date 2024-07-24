import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../client";

interface FetchOrderListParams {
  searchTerm?: string;
  filters?: {
    [key: string]: string;
  };
  locationId: string;
}

export const getCsFilters = createAsyncThunk(
  "cp/getCsFilters",
  async (locationId: string) => {
    try {
      const url = `csPanel/getCsFilters?locationId=${locationId}`;
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axiosPublic(config);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
export const getCSOrderList = createAsyncThunk(
  "cp/getCSOrderList",
  async (params: FetchOrderListParams) => {
    const { searchTerm, filters, locationId } = params || {};

    let query = new URLSearchParams();
    if (searchTerm) query.append("searchTerm", searchTerm);
    if (filters) {
      Object.keys(filters).forEach((key) => {
        query.append(key, filters[key]);
      });
    }
    const queryString = query.toString();
    try {
      const url = `csPanel/getCSOrderList?locationId=${locationId}${
        queryString ? `&${queryString}` : ""
      }`;
      console.log("url", url);
      const config = {
        method: "get",
        maxBodyLength: Infinity,
        url: url,
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await axiosPublic(config);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
