import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import WaveSelectDropDown from "../storeModule/subRoutesModule/wavesInProgress/waveSelectDropdown";
import FeaturedTable from "@/tables/featuredTable";
import { returnsColumn, returnsRows } from "@/constants/tableConstant";

const ReturnsModule = () => {
  const [tableState, setTableState] = useState({
    columns: returnsColumn,
    rows: returnsRows,
  });
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const options = ["Ref", "Status", "AWB Number"];

  return (
    <Box padding={"1rem"}>
      <Grid container mb={2}>
        <Grid item xs={12} sm={2}>
          <WaveSelectDropDown
            {...{ selectedNames, setSelectedNames, options }}
          />
        </Grid>
      </Grid>
      <Box>
        <FeaturedTable
          {...{
            rows: tableState.rows,
            columns: tableState.columns,
          }}
        />
      </Box>
    </Box>
  );
};

export default ReturnsModule;
