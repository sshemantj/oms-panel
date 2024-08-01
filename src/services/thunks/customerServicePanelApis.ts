import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../client";

interface FetchOrderListParams {
  filters?: {
    [key: string]: string;
  };
}

interface getCsOrderItemsParams {
  locationId: string;
  orderId: string;
}

interface RMAEntryParams {
  shipmentNo: string;
  omsOrderId: string;
  sku: string;
  returnQuantity: number;
  orderLineNo: number;
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
    console.log("params", params);
    const { filters } = params || {};

    let query = new URLSearchParams();

    if (filters) {
      Object.keys(filters).forEach((key) => {
        query.append(key, filters[key]);
      });
    }
    const queryString = query.toString();
    try {
      const url = `csPanel/getCSOrderList${
        queryString ? `?${queryString}` : ""
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

export const getCsOrderItems = createAsyncThunk(
  "cp/getCsOrderItems",
  async ({ locationId, orderId }: getCsOrderItemsParams) => {
    try {
      const url = `csPanel/getCsOrderItems?locationId=${locationId}&orderId=${orderId}`;
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

export const getCancelReasons = createAsyncThunk(
  "dashboard/getCancelReasons",
  async () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/Dashboard/GetDropdownItems?name=CancelReason",
      headers: {
        Authorization: "Bearer {{Token}}",
      },
    };

    try {
      const response = await axiosPublic(config);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const createRMAEntry = createAsyncThunk(
  "rma/createRMAEntry",
  async (data: RMAEntryParams[]) => {
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/RMA/CreateRMAEntry",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiIyIiwidW5pcXVlX25hbWUiOiJvbXN1c2VyMSIsInJvbGUiOiJ1c2VyIiwibmJmIjoxNzIxOTk3MzczLCJleHAiOjE3MjIwMzMzNzMsImlhdCI6MTcyMTk5NzM3M30.gAMs5n4TdJtM1ajIzA0pqmIfIgiW5oZnIxoc8JP-ey4",
      },
      data: data,
    };

    const response = await axiosPublic(config);
    console.log("response", response);
    return {
      data: response.data,
      status: response.status,
    };
  }
);

export const getRmaReasons = createAsyncThunk(
  "dashboard/getRmaReasons",
  async () => {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "/Dashboard/GetDropdownItems?name=RMAReasons",
      headers: {
        Authorization: "Bearer {{Token}}",
      },
    };

    try {
      const response = await axiosPublic(config);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);

export const cancelOrder = createAsyncThunk(
  "cancellations/cancelOrder",
  async (data: any[], thunkAPI) => {
    try {
      const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "cspanel/cancelOrder",
        headers: {
          accept: "*/*",
          "Content-Type": "application/json-patch+json",
        },
        data: data,
      };
      const response = await axiosPublic(config);
      return {
        data: response.data,
        status: response.status,
      };
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
