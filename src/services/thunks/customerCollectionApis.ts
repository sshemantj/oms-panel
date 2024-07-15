import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../client";

interface ValidateOTPParams {
  mobileNo: string;
  otp: string;
  shipmentNo: string;
}

export const validateOTP = createAsyncThunk(
  "packer/validateOTP",
  async (params: ValidateOTPParams) => {
    const data = JSON.stringify({
      mobileNo: params.mobileNo,
      otp: params.otp,
      shipmentNo: params.shipmentNo,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/packer/Pack/validateOTP",
      headers: {
        accept: "*/*",
        "Content-Type": "application/json-patch+json",
      },
      data: data,
    };

    const response = await axiosPublic(config);
    return response.data;
  }
);
