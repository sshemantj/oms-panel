import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import CustomModal from "../CustomModal";
import { Cookies } from "react-cookie";
import { useRouter } from "next/router";
import { Button } from "@mui/material";
const cookie = new Cookies();

interface IProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const LogoutModal = (props: IProps) => {
  const { openModal, setOpenModal } = props;
  const router = useRouter();

  const handleLogin = () => {
    cookie.remove("token");
    toast.success("Logout success!", {
      position: "top-right",
      duration: 2000,
    });
    setOpenModal(false);
    setTimeout(() => router.reload(), 2000);
  };

  return (
    <>
      <CustomModal
        closeIconStyle={{ top: "1rem", right: "1rem" }}
        open={openModal}
        setOpen={setOpenModal}
      >
        <div
          style={{
            // background: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <div
            style={{
              borderRadius: "6px",
              width: "400px",
              height: "300px",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            <h2>Do you want to logout?</h2>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Button
                onClick={() => handleLogin()}
                variant="contained"
                color="error"
              >
                Logout
              </Button>
              <Button
                onClick={() => setOpenModal(false)}
                variant="contained"
                color="info"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </CustomModal>
      <Toaster />
    </>
  );
};

export default LogoutModal;
