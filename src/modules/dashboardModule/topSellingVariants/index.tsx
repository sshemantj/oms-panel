import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import shirtImg1 from "@/images/shirt.jpg";
import shirtImg2 from "@/images/shirt2.jpg";
import shirtImg3 from "@/images/shirt3.jpg";
import styles from "./topSellingVariants.module.scss";

interface IProps {
  icon: any;
  title: string;
  qnt: number;
}

const SinglePd = (props: IProps) => {
  const { icon, title, qnt } = props;
  return (
    <Box className={styles.pdWrapper}>
      <Box className={styles.imgWrapper}>
        <Image
          width={100}
          height={100}
          objectFit="contain"
          src={icon}
          alt="pd"
        />
      </Box>
      <Box>
        <Typography className={styles.title} variant="subtitle2">
          {title}
        </Typography>
      </Box>
      <Box className={styles.quantity}>
        <Typography className={styles.qty} variant="subtitle1">
          25
        </Typography>
        <Typography fontSize={12} variant="subtitle2">
          Qty
        </Typography>
      </Box>
    </Box>
  );
};

const TopSellingVariants = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <SinglePd {...{ icon: shirtImg1, title: "Chambray shirt", qnt: 23 }} />
      </Grid>
      <Grid item xs={4}>
        <SinglePd {...{ icon: shirtImg2, title: "Crown shirt", qnt: 18 }} />
      </Grid>
      <Grid item xs={4}>
        <SinglePd {...{ icon: shirtImg3, title: "Chambray shirt", qnt: 3 }} />
      </Grid>
    </Grid>
  );
};

export default TopSellingVariants;
