import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./customModal.module.scss";

interface IProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalClose?: () => void;
  children: JSX.Element;
  closeIconStyle?: React.CSSProperties;
  showClose?: boolean;
}

const CustomModal = (props: IProps) => {
  const {
    open,
    setOpen = () => {},
    handleModalClose = () => {},
    children,
    closeIconStyle,
    showClose = true,
  } = props;

  const handleClose = () => {
    setOpen(false);
    handleModalClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <>
          {children}
          {showClose && (
            <CloseIcon
              onClick={() => handleClose()}
              style={{
                position: "absolute",
                top: "3rem",
                right: "3.5rem",
                opacity: 0.5,
                cursor: "pointer",
                ...closeIconStyle,
              }}
            />
          )}
        </>
      </Modal>
    </div>
  );
};

export default CustomModal;
