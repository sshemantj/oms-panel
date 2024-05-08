import React, { useEffect, useState } from "react";
import { featuredColumns, featuredRows } from "@/constants/tableConstant";
import { ITabList } from "@/interfaces/home.interface";
import {
  ClickAndCollectTable,
  ExchangesFulfilmentsTable,
  ExpressFulfilmentsTable,
  FulfilmentTable,
  StandardFulfilmentsTable,
} from "./allTables";

interface IProps {
  currTabValue: ITabList;
}

const initialAllTableState = {
  [ITabList.FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.STANDARD_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.EXPRESS_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.EXCHANGES_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.CLICK_AND_COLLECT]: { rows: [], columns: [] },
};

const emtyTableData = {
  rows: featuredRows,
  columns: featuredColumns,
};

const HomeTable = (props: IProps) => {
  const { currTabValue } = props;
  const [tableState, setTableState] = useState(initialAllTableState);

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

  return (
    <>
      {currTabValue === ITabList.FULFILMENTS ? (
        <FulfilmentTable
          {...{
            columns,
            rows,
            showCheckbox,
          }}
        />
      ) : null}
      {currTabValue === ITabList.STANDARD_FULFILMENTS ? (
        <StandardFulfilmentsTable
          {...{
            columns,
            rows,
            showCheckbox,
          }}
        />
      ) : null}
      {currTabValue === ITabList.EXPRESS_FULFILMENTS ? (
        <ExpressFulfilmentsTable
          {...{
            columns,
            rows,
            showCheckbox,
          }}
        />
      ) : null}
      {currTabValue === ITabList.EXCHANGES_FULFILMENTS ? (
        <ExchangesFulfilmentsTable
          {...{
            columns,
            rows,
            showCheckbox,
          }}
        />
      ) : null}
      {currTabValue === ITabList.CLICK_AND_COLLECT ? (
        <ClickAndCollectTable
          {...{
            columns,
            rows,
            showCheckbox,
          }}
        />
      ) : null}
    </>
  );
};

export default HomeTable;
