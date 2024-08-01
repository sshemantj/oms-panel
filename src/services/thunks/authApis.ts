// src/store/thunks/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { axiosPublic } from "../client";
interface ChangePasswordArgs {
  userName: string;
  currentPassword: string;
  newPassword: string;
}

export const authenticate = createAsyncThunk(
  "auth/authenticate",
  async (
    { username, password }: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post("/api/auth/authenticate", {
        username,
        password,
      });

      if (response.data.success) {
        return response.data;
      } else {
        console.log("response nextpapi", response);
        return response.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const logOut = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const responseUnparsed = await fetch("/api/auth/logout", {
      method: "POST",
    });

    if (!responseUnparsed.ok) {
      throw new Error("Failed to fetch.");
    }

    const response: {
      hits?: any[];
    } = await responseUnparsed.json();

    return response;
  } catch (error: any) {
    return thunkAPI.rejectWithValue({ error: error.message });
  }
});
export const changePassword = createAsyncThunk(
  "user/changePassword",
  async ({ userName, currentPassword, newPassword }: ChangePasswordArgs) => {
    const data = JSON.stringify({
      userName,
      CurrentPassword: currentPassword,
      NewPassword: newPassword,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "/users/ChangePassword",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosPublic(config);
    console.log("response", response);
    return response;
  }
);
