import {
  fulfillmentTableColumns,
  fulfillmentsTableRows,
} from "@/constants/tableConstant";
import FeaturedTable from "@/tables/featuredTable";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";

const FulfillmentTable = () => {
  const [tableState, setTableState] = useState({
    columns: fulfillmentTableColumns,
    rows: fulfillmentsTableRows,
  });

  return (
    <Box minHeight={250} bgcolor="#fff" padding="12px 0">
      <Box padding="0 16px 16px 16px" borderBottom="1px solid lightgrey">
        <Typography fontWeight={600} variant="subtitle1">
          FULFILLMENTS DETAILS
        </Typography>
      </Box>
      <Box>
        <FeaturedTable
          {...{
            columns: tableState.columns,
            rows: tableState.rows,
            checkboxSelection: false,
          }}
        />
      </Box>
      <Box textAlign="end">
        <Button
          sx={{ marginRight: "3rem", padding: "4px 10px" }}
          variant="contained"
        >
          Create RMA
        </Button>
      </Box>
    </Box>
  );
};

export default FulfillmentTable;
