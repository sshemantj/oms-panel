import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import {
  awaitingPickColumns,
  awaitingPickRows,
} from "@/constants/tableConstant";
import { Box, Button } from "@mui/material";

const AwaitingPick = () => {
  const [tableState, setTableState] = useState({
    columns: awaitingPickColumns,
    rows: awaitingPickRows,
  });

  return (
    <Box sx={{ width: "100%", marginTop: "1rem", padding: "0 1rem" }}>
      <Box display={"flex"} justifyContent={"flex-end"}>
        <Button style={{ margin: "0 2rem 1rem 0" }} variant="contained">
          Pick list
        </Button>
      </Box>
      <FeaturedTable
        {...{ rows: tableState.rows, columns: tableState.columns }}
      />
    </Box>
  );
};

export default AwaitingPick;
