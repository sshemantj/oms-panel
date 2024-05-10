import React, { useEffect, useState } from "react";
import {
  featuredColumns,
  featuredRows,
  initialAllTableIdsList,
} from "@/constants/tableConstant";
import {
  IAllTableIdsList,
  IAllTableState,
  ITabList,
} from "@/interfaces/home.interface";
import {
  ClickAndCollectTable,
  ExchangesFulfilmentsTable,
  ExpressFulfilmentsTable,
  FulfilmentTable,
  StandardFulfilmentsTable,
} from "./allTables";
import { GridRowSelectionModel } from "@mui/x-data-grid";

interface IProps {
  currTabValue: ITabList;
  tableState: IAllTableState;
  setTableState: React.Dispatch<React.SetStateAction<IAllTableState>>;
  allSelectedRowList: IAllTableIdsList;
  setAllSelectedRowList: React.Dispatch<React.SetStateAction<IAllTableIdsList>>;
}

const emtyTableData = {
  rows: featuredRows,
  columns: featuredColumns,
};

const HomeTable = (props: IProps) => {
  const {
    currTabValue,
    tableState,
    setTableState,
    allSelectedRowList,
    setAllSelectedRowList,
  } = props;

  const handleFulfilmentCall = () => {
    return {
      rows: featuredRows,
      columns: featuredColumns,
    };
  };

  const handleStandardFulfilmentCall = () => {
    return {
      rows: featuredRows,
      columns: featuredColumns,
    };
  };

  const handleExpressFulfilments = () => {
    return {
      rows: featuredRows,
      columns: featuredColumns,
    };
  };

  const handleExchangesFulfilments = () => {
    return {
      rows: featuredRows,
      columns: featuredColumns,
    };
  };

  const handleClickAndCollect = () => {
    return {
      rows: featuredRows,
      columns: featuredColumns,
    };
  };

  const getTableData = (type: ITabList) => {
    switch (type) {
      case ITabList.FULFILMENTS:
        return handleFulfilmentCall();

      case ITabList.STANDARD_FULFILMENTS:
        return handleStandardFulfilmentCall();

      case ITabList.EXPRESS_FULFILMENTS:
        return handleExpressFulfilments();

      case ITabList.EXCHANGES_FULFILMENTS:
        return handleExchangesFulfilments();

      case ITabList.CLICK_AND_COLLECT:
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

  const showCheckbox = currTabValue !== ITabList.FULFILMENTS;

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
      {currTabValue === ITabList.FULFILMENTS ? (
        <FulfilmentTable
          {...{
            columns,
            rows,
            showCheckbox,
            onRowSelectionModelChange,
          }}
        />
      ) : null}
      {currTabValue === ITabList.STANDARD_FULFILMENTS ? (
        <StandardFulfilmentsTable
          {...{
            columns,
            rows,
            showCheckbox,
            onRowSelectionModelChange,
          }}
        />
      ) : null}
      {currTabValue === ITabList.EXPRESS_FULFILMENTS ? (
        <ExpressFulfilmentsTable
          {...{
            columns,
            rows,
            showCheckbox,
            onRowSelectionModelChange,
          }}
        />
      ) : null}
      {currTabValue === ITabList.EXCHANGES_FULFILMENTS ? (
        <ExchangesFulfilmentsTable
          {...{
            columns,
            rows,
            showCheckbox,
            onRowSelectionModelChange,
          }}
        />
      ) : null}
      {currTabValue === ITabList.CLICK_AND_COLLECT ? (
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

export default HomeTable;
