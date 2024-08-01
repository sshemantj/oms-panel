import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPublic } from "../client";

interface ValidateOTPParams {
  mobileNo: string;
  otp: string;
  shipmentNo: string;
}

interface SendOtpPayload {
  mobileNo: string;
  omsOrderId: string;
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

export const sendOtp = createAsyncThunk(
  "otp/sendOtp",
  async (params: SendOtpPayload) => {
    const data = JSON.stringify({
      mobileNo: params.mobileNo,
      omsOrderId: params.omsOrderId,
      shipmentNo: params.shipmentNo,
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/packer/Pack/sendOTP",
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
