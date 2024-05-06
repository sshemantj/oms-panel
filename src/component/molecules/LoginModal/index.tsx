import React, { useEffect, useState } from "react";
import { Grid, TextField, Paper, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import CustomModal from "../CustomModal";
import toast, { Toaster } from "react-hot-toast";
import styles from "./login.module.scss";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { callLogin, getUserDetails } from "@/services/thunks/loginApi";
import {
  closeLoginModal,
  openLoginModal,
  persistUsername,
} from "@/store/slices/loginSlice";
import { Cookies } from "react-cookie";
import { setLoader } from "@/store/slices/gatewaySlice";

const cookie = new Cookies();

const LoginComponent = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const showLoginModal = useAppSelector((state) => state.login.showLoginModal);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleLogin = () => {
    if (!username && !password) toast.error("username and password required!");
    dispatch(setLoader(true));
    dispatch(callLogin({ Username: username, Password: password }))
      .then(() => {
        dispatch(persistUsername(username));
        dispatch(getUserDetails(username)).then(() => {
          dispatch(setLoader(false));
          router.reload();
          handleModalClose();
        });
      })
      .catch((error: any) =>
        toast.error(error.message || "Error while trying to login!", {
          position: "top-right",
          duration: 2000,
        })
      );
  };

  const handleModalClose = () => {
    dispatch(closeLoginModal());
  };

  // useEffect(() => {
  //   if (!cookie.get("token")) {
  //     dispatch(openLoginModal());
  //   }
  // }, []);

  return (
    <CustomModal
      {...{ open: showLoginModal, handleModalClose, showClose: false }}
    >
      <div className={styles.loginWrapper}>
        <div style={{ padding: 30, height: "100%" }}>
          <Paper
            sx={{
              height: "100%",
              display: "flex",
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
                Login
              </Typography>
              <Grid item xs={12} margin={"0 0 1rem 0"}>
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
                      width: "280px",
                      height: "0.4rem",
                    },
                  }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  label="Password"
                  type={"password"}
                />
              </Grid>
              <Grid item xs={12} width={"310px"}>
                <Button
                  fullWidth
                  onClick={() => handleLogin()}
                  sx={{ width: "100%", margin: "1rem 0" }}
                  variant="contained"
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </div>
        <Toaster />
      </div>
    </CustomModal>
  );
};

export default LoginComponent;
