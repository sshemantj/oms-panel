import React from "react";
import { Box, Grid } from "@mui/material";
import DetailedBox from "./detailedBox";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import styles from "./dashboard.module.scss";

const boxList = [
  {
    title: "Today's Sales",
    icon: <CurrencyRupeeIcon />,
    price: "343",
  },
  { title: "Today's Expenses", icon: <CurrencyRupeeIcon />, price: "343" },
  { title: "Products To Reorder", icon: <ShoppingCartIcon />, price: "343" },
  { title: "Pending Orders", icon: <RotateRightIcon />, price: "343" },
];

const DashboardModule = () => {
  return (
    <Grid container spacing={2} className={styles.dashboardWrapper}>
      <Grid sm={12} item>
        <Grid container spacing={2}>
          <Grid sm={8} item>
            <Grid container spacing={2}>
              {boxList.map((item, index) => {
                return (
                  <Grid key={index} sm={6} item>
                    <DetailedBox {...item}>1</DetailedBox>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid sm={4} item>
            <Box className={styles.quickLinks}>Quick Links</Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid sm={12} item>
        <Box bgcolor="white" minHeight="100vh">
          graph
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardModule;
