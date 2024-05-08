import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { inProgressRows, inProgressColumns } from "@/constants/tableConstant";
import { Box } from "@mui/material";

const WavesInProgress = () => {
  const [tableState, setTableState] = useState({
    columns: inProgressColumns,
    rows: inProgressRows,
  });

  return (
    <Box width={"100%"} mt={2}>
      <FeaturedTable
        {...{ rows: tableState.rows, columns: tableState.columns }}
      />
    </Box>
  );
};

export default WavesInProgress;
