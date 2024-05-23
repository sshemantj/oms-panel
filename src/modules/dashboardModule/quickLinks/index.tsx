import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./quickLinks.module.scss";

const innerBtnList = ["New Order", "Add Invoice", "Inventory"];

const QuickLinks = () => {
  return (
    <Box className={styles.quickLinksWrapper}>
      <Typography variant="h6">Quick Links</Typography>
      <Box className={styles.innerBtnsWrappers}>
        {innerBtnList.map((name) => {
          return (
            <Box key={name} className={styles.innerButton}>
              {name}
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default QuickLinks;
