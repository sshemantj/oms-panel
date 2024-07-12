import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../client";

const packFilters = createAsyncThunk(
  "pick/PickFilters",
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

export { packFilters };
