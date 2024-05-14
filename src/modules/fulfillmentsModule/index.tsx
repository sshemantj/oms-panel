import React, { useState } from "react";
import FulfillmentsTabs from "./fulfillmentsTabs";
import { IFulFillmentsTabsList } from "@/interfaces/fulfillments.interface";
import { Box } from "@mui/material";
import FulfillmentsTable from "./fulfillmentsTables.tsx";
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
