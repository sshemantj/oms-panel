import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import DetailedBox from "./detailedBox";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import RotateRightIcon from "@mui/icons-material/RotateRight";
import QuickLinks from "./quickLinks";
import styles from "./dashboard.module.scss";
import ChartDashboard from "./chartDashboard";
import ToggleMonths from "./toggleMonths";

const boxList = [
  {
    title: "Today's Sales",
    icon: <CurrencyRupeeIcon />,
    price: "256950000.00",
  },
  {
    title: "Total recieved orders",
    icon: <ShoppingCartIcon />,
    price: "157323000",
  },
  { title: "Pending orders", icon: <ShoppingCartIcon />, price: "2" },
  { title: "Fulfilled orders", icon: <RotateRightIcon />, price: "2" },
];

const DashboardModule = () => {
  const [currValue, setCurrValue] = useState<string>("twoMonths");

  return (
    <Grid container spacing={2} className={styles.dashboardWrapper}>
      <Grid sm={12} item>
        <Grid container spacing={2}>
          <Grid xs={12} sm={8} item>
            <Grid container spacing={2}>
              {boxList.map((item, index) => {
                return (
                  <Grid key={index} xs={12} sm={6} item>
                    <DetailedBox {...item}>1</DetailedBox>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid xs={12} sm={4} item>
            <QuickLinks />
          </Grid>
        </Grid>
      </Grid>
      <Grid sm={12} item>
        <Box minHeight="80vh">
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Monthly Sales</Typography>
            <ToggleMonths
              {...{
                currValue,
                setCurrValue,
                sx: { marginRight: "2rem" },
              }}
            />
          </Box>
          <Box mt={1} p={1} bgcolor="white">
            <ChartDashboard {...{ currValue, setCurrValue }} />
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardModule;
