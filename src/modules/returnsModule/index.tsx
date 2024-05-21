import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import WaveSelectDropDown from "../storeModule/subRoutesModule/wavesInProgress/waveSelectDropdown";
import FeaturedTable from "@/tables/featuredTable";
import { returnsColumn, returnsRows } from "@/constants/tableConstant";
import { GridRenderCellParams, GridTreeNodeWithRender } from "@mui/x-data-grid";

type ICellPara = GridRenderCellParams<any, any, any, GridTreeNodeWithRender>;

const ReturnsModule = () => {
  const [tableState, setTableState] = useState<any>({
    columns: [],
    rows: [],
  });

  const handleQcClick = (params: ICellPara) => {
    console.log(params);
  };

  useEffect(() => {
    const updatedColumns = returnsColumn.map((item) => {
      if (item.field !== "performQc") return item;
      item.renderCell = (params: ICellPara) => {
        return (
          <Button
            onClick={() => handleQcClick(params.row)}
            sx={{ padding: "4px 8px" }}
            variant="contained"
          >
            Perform QC
          </Button>
        );
      };
      return item;
    });
    setTableState({
      columns: updatedColumns,
      rows: returnsRows,
    });
  }, [returnsColumn, returnsRows]);

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
