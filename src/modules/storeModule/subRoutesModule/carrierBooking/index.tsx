import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FeaturedTable from "@/tables/featuredTable";
import {
  carrierBookingColumns,
  carrierBookingRows,
} from "@/constants/tableConstant";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const CarrierBooking = () => {
  const [tableState, setTableState] = useState({
    columns: carrierBookingColumns,
    rows: carrierBookingRows,
  });

  return (
    <Box sx={{ width: "100%", marginTop: "1rem" }}>
      <Box sx={{ ...flex, justifyContent: "space-between", padding: "0 1rem" }}>
        <Box sx={{ ...flex, width: "100%", justifyContent: "space-between" }}>
          <Box sx={{ ...flex, gap: "0.5rem" }}>
            <LocalShippingIcon style={{ marginTop: "-5px" }} />
            <Typography fontWeight={600}>Carrier Booking</Typography>
          </Box>
        </Box>
      </Box>
      <Box sx={{ marginTop: "1rem", padding: "0 1rem" }}>
        <FeaturedTable
          {...{
            rows: tableState.rows,
            columns: tableState.columns,
            hideFooter: true,
          }}
        />
      </Box>
    </Box>
  );
};

export default CarrierBooking;
