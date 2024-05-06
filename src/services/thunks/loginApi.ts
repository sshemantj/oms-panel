import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosPrivate, axiosPublic } from "../client";
import { Cookies } from "react-cookie";

const cookie = new Cookies();

interface ILogin {
  Username: string;
  Password: string;
}

const callLogin = createAsyncThunk(
  "login",
  async ({ Username, Password }: ILogin) => {
    const url = "/api/Authentication/authenticate";
    const body = {
      Username,
      Password,
    };

    const response = await axiosPublic.post(url, body);
    const accessToken = response.data.accessToken;

    cookie.set("token", accessToken, {
      secure: process.env.NODE_ENV !== "development",
      path: "/",
    });

    return {
      message: "token has been set successfully",
    };
  }
);

const getUserDetails = createAsyncThunk(
  "table/getUserDetails",
  async (username: string) => {
    try {
      const url = `api/Authentication/get/${username}`;

      const response = await axiosPrivate.get(url);

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export { callLogin, getUserDetails };
