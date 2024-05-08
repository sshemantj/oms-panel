import React from "react";
import FeaturedTable, { IFeaturedTableProps } from "@/tables/featuredTable";

interface IAllTableProps extends IFeaturedTableProps {
  showCheckbox: boolean;
}

const FulfilmentTable = (props: IAllTableProps) => {
  const { columns, rows, showCheckbox, ...rest } = props;

  return (
    <FeaturedTable
      {...{
        columns,
        rows,
        checkboxSelection: showCheckbox,
        rest,
      }}
    />
  );
};

const StandardFulfilmentsTable = (props: IAllTableProps) => {
  const { columns, rows, showCheckbox, ...rest } = props;

  return (
    <FeaturedTable
      {...{
        columns,
        rows,
        checkboxSelection: showCheckbox,
        rest,
      }}
    />
  );
};

const ExpressFulfilmentsTable = (props: IAllTableProps) => {
  const { columns, rows, showCheckbox, ...rest } = props;

  return (
    <FeaturedTable
      {...{
        columns,
        rows,
        checkboxSelection: showCheckbox,
        rest,
      }}
    />
  );
};

const ExchangesFulfilmentsTable = (props: IAllTableProps) => {
  const { columns, rows, showCheckbox, ...rest } = props;

  return (
    <FeaturedTable
      {...{
        columns,
        rows,
        checkboxSelection: showCheckbox,
        rest,
      }}
    />
  );
};

const ClickAndCollectTable = (props: IAllTableProps) => {
  const { columns, rows, showCheckbox, ...rest } = props;

  return (
    <FeaturedTable
      {...{
        columns,
        rows,
        checkboxSelection: showCheckbox,
        rest,
      }}
    />
  );
};

export {
  FulfilmentTable,
  StandardFulfilmentsTable,
  ExpressFulfilmentsTable,
  ExchangesFulfilmentsTable,
  ClickAndCollectTable,
};
