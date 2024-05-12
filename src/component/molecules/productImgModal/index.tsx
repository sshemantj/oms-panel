import React, { Dispatch, SetStateAction } from "react";
import CustomModal from "../CustomModal";
import { Button } from "@mui/material";

interface IProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const ProductImgModal = (props: IProps) => {
  const { openModal, setOpenModal } = props;

  return (
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
              //   onClick={() => handleLogin()}
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
  );
};

export default ProductImgModal;
