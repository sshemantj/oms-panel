import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate } from "../client";

export interface IFetchTableData {
  pageNumber?: number;
  pageSize?: number;
  searchTerm?: string;
  channelid?: string;
}

export interface IPostChannelMapping {
  channelid: string;
  channelname: string;
  sizevariantcode: number;
  stylecode: string;
  StyleVariantCode: string;
}

export interface ICreateChannelPayload {
  payload: {
    channelid: string;
    channelname: string;
    description: string;
    isactive: boolean;
  };
}

const postChannelMapping = createAsyncThunk(
  "table/MapChannel",
  async (payload: IPostChannelMapping[]) => {
    try {
      const url = "/api/Channel/MapChannel";

      const response = await axiosPrivate.post(url, payload);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export { postChannelMapping };
