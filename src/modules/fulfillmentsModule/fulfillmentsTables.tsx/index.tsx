import React, { useEffect } from "react";
import {
  fulfillmentColumns,
  fulfillmentsRows,
} from "@/constants/tableConstant";
import {
  IAllFulfillmentTableState,
  IAllFulfillmentTableIdsList,
  // IFulFillmentsTabsList,
} from "@/interfaces/fulfillments.interface";
import {
  ClickAndCollectTable,
  ExpressFulfilmentsTable,
  FulfilmentTable,
  StandardFulfilmentsTable,
} from "./allFulfilmentsTable";
import { GridRowSelectionModel } from "@mui/x-data-grid";
import { IFulFillmentsTabsList } from "@/interfaces/fulfillments.interface";

interface IProps {
  currTabValue: IFulFillmentsTabsList;
  tableState: IAllFulfillmentTableState;
  setTableState: React.Dispatch<
    React.SetStateAction<IAllFulfillmentTableState>
  >;
  allSelectedRowList: IAllFulfillmentTableIdsList;
  setAllSelectedRowList: React.Dispatch<
    React.SetStateAction<IAllFulfillmentTableIdsList>
  >;
}

const emtyTableData = {
  rows: fulfillmentsRows,
  columns: fulfillmentColumns,
};

const FulfillmentsTable = (props: IProps) => {
  const {
    currTabValue,
    tableState,
    setTableState,
    allSelectedRowList,
    setAllSelectedRowList,
  } = props;

  const handleFulfilmentCall = () => {
    return {
      rows: fulfillmentsRows,
      columns: fulfillmentColumns,
    };
  };

  const handleStandardFulfilmentCall = () => {
    return {
      rows: fulfillmentsRows,
      columns: fulfillmentColumns,
    };
  };

  const handleExpressFulfilments = () => {
    return {
      rows: fulfillmentsRows,
      columns: fulfillmentColumns,
    };
  };

  const handleClickAndCollect = () => {
    return {
      rows: fulfillmentsRows,
      columns: fulfillmentColumns,
    };
  };

  const getTableData = (type: IFulFillmentsTabsList) => {
    switch (type) {
      case IFulFillmentsTabsList.FULFILMENTS:
        return handleFulfilmentCall();

      case IFulFillmentsTabsList.STANDARD_FULFILMENTS:
        return handleStandardFulfilmentCall();

      case IFulFillmentsTabsList.EXPRESS_FULFILMENTS:
        return handleExpressFulfilments();

      case IFulFillmentsTabsList.CLICK_AND_COLLECT:
        return handleClickAndCollect();
    }
  };

  const handleAllTableDataAsync = async () => {
    const updatedState = JSON.parse(JSON.stringify(tableState));
    //emtyDataFirst
    updatedState[currTabValue] = emtyTableData;
    setTableState(updatedState);
    //addUpdated data
    updatedState[currTabValue] = getTableData(currTabValue);
    setTableState(updatedState);
  };

  useEffect(() => {
    handleAllTableDataAsync();
  }, [currTabValue]);

  // const showCheckbox = currTabValue !== IFulFillmentsTabsList.FULFILMENTS;
  const showCheckbox = false;

  const columns = tableState[currTabValue]?.columns || [];
  const rows = tableState[currTabValue]?.rows || [];

  const onRowSelectionModelChange = (selectedIds: GridRowSelectionModel) => {
    setAllSelectedRowList((prev) => {
      // @ts-ignore
      prev[currTabValue] = selectedIds;
      return prev;
    });
  };

  return (
    <>
      {currTabValue === IFulFillmentsTabsList.FULFILMENTS ? (
        <FulfilmentTable
          {...{
            columns,
            rows,
            showCheckbox,
            onRowSelectionModelChange,
          }}
        />
      ) : null}
      {currTabValue === IFulFillmentsTabsList.STANDARD_FULFILMENTS ? (
        <StandardFulfilmentsTable
          {...{
            columns,
            rows,
            showCheckbox,
            onRowSelectionModelChange,
          }}
        />
      ) : null}
      {currTabValue === IFulFillmentsTabsList.EXPRESS_FULFILMENTS ? (
        <ExpressFulfilmentsTable
          {...{
            columns,
            rows,
            showCheckbox,
            onRowSelectionModelChange,
          }}
        />
      ) : null}
      {currTabValue === IFulFillmentsTabsList.CLICK_AND_COLLECT ? (
        <ClickAndCollectTable
          {...{
            columns,
            rows,
            showCheckbox,
            onRowSelectionModelChange,
          }}
        />
      ) : null}
    </>
  );
};

export default FulfillmentsTable;
