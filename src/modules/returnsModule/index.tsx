import React, { useState } from "react";
// import FulfillmentsTabs from "./fulfillmentsTabs";
import { IFulFillmentsTabsList } from "@/interfaces/fulfillments.interface";
import { Box } from "@mui/material";
// import FulfillmentsTable from "./fulfillmentsTables.tsx";
import {
  initialAllFulfillmentTableIdsList,
  initialAllFulfillmentTableState,
} from "@/constants/tableConstant";
import {
  IAllFulfillmentTableIdsList,
  IAllFulfillmentTableState,
} from "@/interfaces/fulfillments.interface";
import { GridToolbarFilterButton } from "@mui/x-data-grid";

const CustomTableFilter = () => {
  return (
    <Box sx={{ margin: "1rem" }}>
      <GridToolbarFilterButton
        slotProps={{
          button: {
            sx: {
              padding: "4px 12px",
              textTransform: "none",
              border: "1px dashed blue",
              borderRadius: "2.5rem",
            },

            startIcon: "+ Add",
          },
        }}
      />
    </Box>
  );
};

const ReturnsModule = () => {
  const [currTabValue, setCurrTabValue] = useState<IFulFillmentsTabsList>(
    IFulFillmentsTabsList.FULFILMENTS
  );

  const [allSelectedRowList, setAllSelectedRowList] =
    useState<IAllFulfillmentTableIdsList>(initialAllFulfillmentTableIdsList);

  const [tableState, setTableState] = useState<IAllFulfillmentTableState>(
    initialAllFulfillmentTableState
  );

  return (
    <Box>
      <Box>
        {/* <FulfillmentsTabs {...{ currTabValue, setCurrTabValue }} /> */}
      </Box>
      <Box>
        {/* <FulfillmentsTable
          {...{
            currTabValue,
            tableState,
            setTableState,
            allSelectedRowList,
            setAllSelectedRowList,
            slots: {
              toolbar: CustomTableFilter,
            },
          }}
        /> */}
      </Box>
    </Box>
  );
};

export default ReturnsModule;
