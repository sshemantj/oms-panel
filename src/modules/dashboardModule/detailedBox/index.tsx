import React from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import styles from "./detailedBox.module.scss";

interface IProps {
  icon?: any;
  title: string;
  price: string;
}

const DetailedBox = (props: IProps) => {
  const { icon = "", price, title } = props;
  return (
    <Box className={styles.detailedBoxWrapper}>
      {typeof icon === "string" ? <Image src={icon} alt="icon" /> : icon}
      <Typography variant="h4" className={styles.price}>
        ${price}
      </Typography>
      <Typography variant="h6" className={styles.title}>
        {title}
      </Typography>
    </Box>
  );
};

export default DetailedBox;
