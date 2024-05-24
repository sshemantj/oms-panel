import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./inventorySummary.module.scss";

const innerBtnList = [
  { title: "QUANTITY IN HAND", value: 644 },
  { title: "QUANTITY TO BE RECIEVED", value: 294 },
];

const InventorySummary = () => {
  return (
    <Box className={styles.quickLinksWrapper}>
      <Typography fontWeight={600} color="grey" variant="h6">
        Inventory Summary
      </Typography>
      <Box className={styles.innerBtnsWrappers}>
        {innerBtnList.map(({ title, value }) => {
          return (
            <Box key={title} className={styles.innerButton}>
              <Typography fontWeight={600} color="grey" variant="subtitle2">
                {title}
              </Typography>
              <Typography fontWeight={600} color="black" variant="subtitle2">
                {value}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default InventorySummary;
