import React, { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import DetailedBox, { IDetailedBoxProps } from "./detailedBox";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArchiveIcon from "@mui/icons-material/Archive";
import ErrorIcon from "@mui/icons-material/Error";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import InventorySummary from "./inventorySummary";
import ChartDashboard from "./chartDashboard";
import ToggleMonths from "./dashboardPdDetails";
import FrameBox from "@/component/atoms/frameBox";
import styles from "./dashboard.module.scss";
import DashboardPdDetails from "./dashboardPdDetails";
import TopSellingVariants from "./topSellingVariants";
import SalesOrderTable from "./salesOrderTable";

const boxList: IDetailedBoxProps[] = [
  {
    title: "Order recieved",
    icon: <CheckCircleIcon />,
    price: "25695",
    color: "primary",
  },
  {
    title: "Packed",
    icon: <ArchiveIcon />,
    price: "15732",
    color: "success",
  },
  {
    title: "Dispatch",
    icon: <LocalShippingIcon />,
    price: "762",
    color: "warning",
  },
  {
    title: "Failed",
    icon: <ErrorIcon />,
    price: "872",
    color: "red",
  },
];

const DashboardModule = () => {
  const [currValue, setCurrValue] = useState<string>("twoMonths");

  return (
    <Grid container spacing={2} className={styles.dashboardWrapper}>
      <Grid xs={12} item>
        <Grid container spacing={2}>
          <Grid xs={12} sm={8} item>
            <Grid container columnSpacing={4}>
              <Grid mb={1} xs={12} item>
                <Typography fontWeight={600} color="grey" variant="h6">
                  Sales Activity{" "}
                  <Typography fontWeight={400} fontSize={16} variant="caption">
                    (in quantity)
                  </Typography>
                </Typography>
              </Grid>
              {boxList.map((item, index) => {
                return (
                  <Grid key={index} xs={12} sm={3} item>
                    <DetailedBox {...item}>1</DetailedBox>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid xs={12} sm={4} item>
            <InventorySummary />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={12} item>
        <Box width="100%" p={2} bgcolor="white">
          <Grid container columnSpacing={2}>
            <Grid item xs={6}>
              <FrameBox title="PRODUCT DETAILS">
                <DashboardPdDetails />
              </FrameBox>
            </Grid>
            <Grid item xs={6}>
              <FrameBox
                title="TOP SELLING VARIANTS"
                headerComponent={<Box>This month</Box>}
              >
                <TopSellingVariants />
              </FrameBox>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <Grid xs={12} item>
        <Box width="100%" p={2} bgcolor="white">
          <FrameBox title="SALES ORDER">
            <SalesOrderTable />
          </FrameBox>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardModule;
