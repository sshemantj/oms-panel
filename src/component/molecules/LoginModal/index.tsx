import { callLogin, getUserDetails } from "@/services/thunks/loginApi";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setLoader } from "@/store/slices/dashboardSlice";
import {
  closeLoginModal,
  login,
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
import CustomModal from "../CustomModal";
import { getCookie, setCookie } from "cookies-next";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { authenticate } from "@/services/thunks/authApis";
import { unwrapResult } from "@reduxjs/toolkit";
import ToastMessage from "../ToastInfoMessage";

const roleRedirects: Record<string, string> = {
  storeTL: "/",
  picker: "/pick-screen",
  packer: "/pack-screen",

  globalTL: "/dashboard",
  customerService: "/customer-service-panel",
};

const LoginComponent = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {
    console.log("password", password);
    if (!username) {
      toast.error("username is required!");
      return;
    }
    if (!password) {
      toast.error("password is  required!");
      return;
    }

    try {
      const resultAction = await dispatch(authenticate({ username, password }));
      const response = unwrapResult(resultAction);
      console.log("response", response);
      if (response.success) {
        if (
          response.message ===
          "You must change your password before continuing."
        ) {
          ToastMessage({
            message: response.message,
          });
          router.push("/update-password");
        } else {
          toast.success(response.message);
          if (response.role) {
            const redirectUrl = roleRedirects[response.role] || "/";
            router.push(redirectUrl);
          }
        }
      } else {
        toast.error(response.message);
      }
      // Router.push("/update-password");
    } catch (error: any) {
      toast.error(error || "Error while trying to login!", {
        position: "top-right",
        duration: 2000,
      });
    }
  };

  const handleModalClose = () => {
    dispatch(closeLoginModal());
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
          <Typography variant="h5" m={1} fontWeight={500}>
            Oms Panel Login
          </Typography>
          <Grid item xs={12} margin={"1rem"}>
            <TextField
              InputLabelProps={{
                style: { top: "-0.3rem" },
              }}
              inputProps={{
                style: {
                  width: "280px",
                  height: "0.4rem",
                },
              }}
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              label="Username"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
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
          <Grid item xs={12} width={"310px"}>
            <Button
              fullWidth
              onClick={handleLogin}
              sx={{ width: "100%", margin: "1rem 0" }}
              variant="contained"
            >
              Login
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default LoginComponent;
