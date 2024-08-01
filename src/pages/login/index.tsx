import LoginComponent from "@/component/molecules/LoginModal";
import MainLayout from "@/layout/MainLayout";
import { Box } from "@mui/material";
import Head from "next/head";

const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      <LoginComponent />
    </Box>
  );
};
export default Login;
