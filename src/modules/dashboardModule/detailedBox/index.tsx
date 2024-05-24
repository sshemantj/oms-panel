import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./detailedBox.module.scss";

export interface IDetailedBoxProps {
  icon?: any;
  title: string;
  price: string;
  color?: "success" | "primary" | "warning" | "red";
}

const DetailedBox = (props: IDetailedBoxProps) => {
  const { icon = "", price, title, color = "primary" } = props;
  return (
    <Box className={styles.detailedBoxWrapper}>
      <Typography variant="h4" className={`${styles.price} ${styles[color]}`}>
        {price}
      </Typography>
      <Box className={styles.textWrapper}>
        {typeof icon === "string" ? <Image src={icon} alt="icon" /> : icon}
        <Typography variant="subtitle2" className={styles.title}>
          {title}
        </Typography>
      </Box>
    </Box>
  );
};

export default DetailedBox;
