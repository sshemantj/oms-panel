import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./frame.module.scss";

interface IProps {
  title: string;
  children: any;
  headerComponent?: any;
}

const FrameBox = (props: IProps) => {
  const { title = "", children, headerComponent } = props;
  return (
    <Box className={styles.frameWrapper}>
      <Box className={styles.titleContainer}>
        <Typography fontWeight={600} variant="subtitle2">
          {title}
        </Typography>
        {headerComponent}
      </Box>
      <Box>{children}</Box>
    </Box>
  );
};

export default FrameBox;
