import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import DetailedBox from "./detailedBox";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import QuickLinks from "./quickLinks";
import styles from "./dashboard.module.scss";
import Chart from "@/component/molecules/charts";

const boxList = [
  {
    title: "Today's Sales",
    icon: <CurrencyRupeeIcon />,
    price: "256950000.00",
  },
  {
    title: "Today's Expenses",
    icon: <CurrencyRupeeIcon />,
    price: "157323000",
  },
  { title: "Products To Reorder", icon: <ShoppingCartIcon />, price: "2" },
  { title: "Pending Orders", icon: <RotateRightIcon />, price: "2" },
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
            <QuickLinks />
          </Grid>
        </Grid>
      </Grid>
      <Grid sm={12} item>
        <Box minHeight="100vh">
          <Typography variant="h5">Monthly Sales</Typography>
          <Box mt={1} p={1} bgcolor="white" minHeight="100vh">
            <Chart type="bar" />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardModule;
