import React, { useState } from "react";
import {
  orderRefColumns,
  orderRefColumns2,
  orderRefRows,
  orderRefRows2,
} from "@/constants/tableConstant";
import FeaturedTable from "@/tables/featuredTable";
import { Box, Button } from "@mui/material";
import OrderTypeSelect from "./orderTypeSelect";
import { useRouter } from "next/router";
import { IStoreListRoutes } from "@/constants/allRoutes";

const OrderReference = () => {
  const [tableState, setTableState] = useState({
    columns: orderRefColumns,
    rows: orderRefRows,
  });

  const [tableState2, setTableState2] = useState({
    columns: orderRefColumns2,
    rows: orderRefRows2,
  });

  const router = useRouter();

  const handleBookClick = () => {
    router.push(IStoreListRoutes.CARRIER_BOOKING);
  };

  return (
    <Box sx={{ padding: "0 1rem 1rem 1rem", background: "#fff" }}>
      <Box mt={2}>
        <FeaturedTable
          {...{
            rows: tableState.rows,
            columns: tableState.columns,
            tableStyleWrapper: {
              height: "auto",
              maxHeight: 400,
            },
            hideFooter: true,
          }}
        />
      </Box>
      <Box mt={2}>
        <OrderTypeSelect />
      </Box>
      <Box mt={2}>
        <FeaturedTable
          {...{
            rows: tableState2.rows,
            columns: tableState2.columns,
            tableStyleWrapper: {
              height: "auto",
              maxHeight: 400,
            },
            hideFooter: true,
          }}
        />
        <Button
          sx={{ marginTop: "1rem", padding: "2px 8px" }}
          variant="contained"
          onClick={() => handleBookClick()}
        >
          Book
        </Button>
      </Box>
    </Box>
  );
};

export default OrderReference;
