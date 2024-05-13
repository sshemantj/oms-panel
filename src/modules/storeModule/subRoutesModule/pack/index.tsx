import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import OrderReference from "./orderRef";
import styles from "./pack.module.scss";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const PackScreen = () => {
  return (
    <Box sx={{ width: "100%", marginTop: "1rem" }}>
      <Box sx={{ ...flex, justifyContent: "space-between", padding: "0 1rem" }}>
        <Box sx={{ ...flex, width: "100%", justifyContent: "space-between" }}>
          <Box sx={{ ...flex, gap: "0.5rem" }}>
            <Inventory2Icon style={{ marginTop: "-5px" }} />
            <Typography fontWeight={600}>PACK</Typography>
          </Box>
        </Box>
      </Box>
      <Box className={styles.packWrapper}>
        {[0, 1].map((item) => (
          <OrderReference key={item} index={item} />
        ))}
      </Box>
    </Box>
  );
};

export default PackScreen;
