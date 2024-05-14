import React, { useState } from "react";
import FulfillmentsTabs from "./fulfillmentsTabs";
import { IFulFillmentsTabsList } from "@/interfaces/fulfillments.interface";
import { Box, Button } from "@mui/material";
import FulfillmentsTable from "./fulfillmentsTables.tsx";
import AddIcon from "@mui/icons-material/Add";
import {
  initialAllFulfillmentTableIdsList,
  initialAllFulfillmentTableState,
} from "@/constants/tableConstant";
import {
  IAllFulfillmentTableIdsList,
  IAllFulfillmentTableState,
} from "@/interfaces/fulfillments.interface";

const FulfillmentsModule = () => {
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
        <FulfillmentsTabs {...{ currTabValue, setCurrTabValue }} />
      </Box>
      <Box>
        <Box sx={{ margin: "1rem" }}>
          <Button
            sx={{
              padding: "6px",
              textTransform: "none",
              border: "1px dashed blue",
              borderRadius: "2.5rem",
            }}
          >
            <AddIcon style={{ fontSize: "16px" }} />
            Add a filter
          </Button>
        </Box>
        <FulfillmentsTable
          {...{
            currTabValue,
            tableState,
            setTableState,
            allSelectedRowList,
            setAllSelectedRowList,
          }}
        />
      </Box>
    </Box>
  );
};

export default FulfillmentsModule;
