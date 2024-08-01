import UpdatePasswordComponent from "@/components/UpdatePassword";
import MainLayout from "@/layout/MainLayout";
import { Box } from "@mui/material";
import Head from "next/head";

const UpdatePassword = () => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
        }}
      >
        <UpdatePasswordComponent />
      </Box>
    </>
  );
};
export default UpdatePassword;
