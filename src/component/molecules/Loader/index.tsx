import { Box, CircularProgress } from "@mui/material";
import React from "react";

interface LoaderProps {
  size?: number;
  color?: "primary" | "secondary" | "error" | "info" | "success" | "warning";
  overlay?: boolean;
}

const Loader: React.FC<LoaderProps> = ({
  size = 40,
  color = "primary",
  overlay = true,
}) => {
  return overlay ? (
    <Box
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: 9999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress size={size} color={color} />
    </Box>
  ) : (
    <CircularProgress size={size} color={color} />
  );
};

export default Loader;
