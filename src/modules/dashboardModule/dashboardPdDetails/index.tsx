import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import styles from "./dashboardPdDetails.module.scss";

interface IProps {}

const pdDetailList = [
  {
    name: "Low Stock Variants",
    value: 30,
    color: "red",
  },
  {
    name: "All Items",
    value: 130,
    color: "",
  },
  {
    name: "All Variants",
    value: 200,
    color: "",
  },
];

const DashboardPdDetails = (props: IProps) => {
  return (
    <Grid container className={styles.dashboardPdDetails}>
      <Grid item xs={6} className={styles.dashboardPdContainer}>
        {pdDetailList.map(({ name, value, color }) => {
          return (
            <Box key={name} className={styles.dashboardPdInner}>
              <Typography className={`${styles.name} ${styles[color]}`}>
                {name}
              </Typography>
              <Typography className={`${styles.value} ${styles[color]}`}>
                {value}
              </Typography>
            </Box>
          );
        })}
      </Grid>
      <Grid item xs={6}></Grid>
    </Grid>
  );
};

export default DashboardPdDetails;
