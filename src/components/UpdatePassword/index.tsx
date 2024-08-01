import { callLogin, getUserDetails } from "@/services/thunks/loginApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLoader } from "@/store/slices/dashboardSlice";
import {
  closeLoginModal,
  openLoginModal,
  persistUsername,
} from "@/store/slices/loginSlice";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getCookie, setCookie } from "cookies-next";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import useUser from "@/hooks/useUser";
import { changePassword } from "@/services/thunks/authApis";
import { unwrapResult } from "@reduxjs/toolkit";

const UpdatePasswordComponent = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();
  const { user } = useUser();

  const dispatch = useAppDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleClickConfirmShowPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleUpdatePassword = async () => {
    if (!currentPassword) {
      toast.error("Current Password  required!");
      return;
    }
    if (!newPassword) {
      toast.error("New Password required!");
      return;
    }
    if (user?.userName) {
      console.log("user.userName", user?.userName);

      console.log("currentPassword", currentPassword);
      console.log("newPassword", newPassword);
      try {
        const resultAction = await dispatch(
          changePassword({
            userName: user.userName,
            currentPassword,
            newPassword,
          })
        );
        const originalPromiseResult = unwrapResult(resultAction);
        console.log("originalPromiseResult", originalPromiseResult);
        if (
          originalPromiseResult &&
          originalPromiseResult.data &&
          originalPromiseResult.data.isSucess
        ) {
          toast.success("Password updated successfully!");
          router.push("/login");
        } else {
          toast.error(originalPromiseResult.data.message);
        }
        // Handle success
      } catch (rejectedValueOrSerializedError) {
        // Handle error
        toast.error("Error updating password. Please try again.");
      }
    } else {
      toast.error("Username not found please login");
    }
  };

  return (
    <div style={{ height: "100%" }}>
      <div
        style={{
          // padding: 30,
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Grid
          container
          width={"100%"}
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <Typography variant="h5" m={"1rem"} fontWeight={500}>
            Update Password
          </Typography>
          <Grid item xs={12} margin={"0 0 1rem 0"}>
            <TextField
              InputLabelProps={{
                style: { top: "-0.3rem" },
              }}
              inputProps={{
                style: {
                  width: "245px",
                  height: "0.4rem",
                },
              }}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              label="Current Password"
              type={showPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              InputLabelProps={{
                style: { top: "-0.3rem" },
              }}
              inputProps={{
                style: {
                  width: "245px",
                  height: "0.4rem",
                },
              }}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              label="New Password"
              type={showConfirmPassword ? "text" : "password"}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickConfirmShowPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12} width={"310px"}>
            <Button
              fullWidth
              onClick={handleUpdatePassword}
              sx={{ width: "100%", margin: "1rem 0" }}
              variant="contained"
            >
              Update Password
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default UpdatePasswordComponent;
