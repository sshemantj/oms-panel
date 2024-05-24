import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { salesOrderColumn, salesOrderRows } from "@/constants/tableConstant";

const SalesOrderTable = () => {
  const [tableState, setTableState] = useState<any>({
    columns: salesOrderColumn,
    rows: salesOrderRows,
  });

  return (
    <Box>
      <FeaturedTable
        {...{
          rows: tableState.rows,
          columns: tableState.columns,
        }}
      />
    </Box>
  );
};

export default SalesOrderTable;
