import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import {
  awaitingPickColumns,
  awaitingPickRows,
} from "@/constants/tableConstant";
import { Box, SxProps, Theme, Button } from "@mui/material";
import { useMobileCheck } from "@/hooks/useMobileCheck";

const bottomBoxSx: SxProps<Theme> = {
  width: "100%",
  padding: "6px 12px",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  background: "#fff",
  position: "fixed",
  bottom: 0,
  right: 0,
};

const AwaitingPick = () => {
  const [tableState, setTableState] = useState({
    columns: awaitingPickColumns,
    rows: awaitingPickRows,
  });

  const isMobile = useMobileCheck();

  return (
    <Box sx={{ width: "100%", marginTop: "1rem", padding: "0 1rem" }}>
      <FeaturedTable
        {...{
          rows: tableState.rows,
          columns: tableState.columns,
          tableStyleWrapper: {
            height: isMobile ? 340 : 400,
          },
        }}
      />
      <Box sx={bottomBoxSx}>
        <Button variant="contained">Pick list</Button>
      </Box>
    </Box>
  );
};

export default AwaitingPick;
