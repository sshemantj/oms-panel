import React from "react";
import InfoIcon from "@mui/icons-material/Info";
import { blue } from "@mui/material/colors";
import toast, { ToastOptions } from "react-hot-toast";

interface ToastMessageProps {
  message: string;
  icon?: React.ReactNode;
  position?:
    | "top-right"
    | "top-center"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left"
    | "top-left";
}

const ToastMessage: React.FC<ToastMessageProps> = ({
  message,
  icon,
  position = "top-right",
}) => {
  const defaultIcon = (
    <InfoIcon style={{ color: blue[500], marginRight: "8px" }} />
  );
  const toastPosition: ToastOptions["position"] = position;
  const content = (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div>{message}</div>
    </div>
  );
  toast(content, {
    icon: icon || defaultIcon,
    position: toastPosition,
  } as ToastOptions);
  return null;
};

export default ToastMessage;
