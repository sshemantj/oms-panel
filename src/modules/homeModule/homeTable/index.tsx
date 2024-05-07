import React from "react";
import { featuredColumns, featuredRows } from "@/constants/tableConstant";
import FeaturedTable from "@/tables/featuredTable";
import { ITabList } from "@/interfaces/home.interface";

interface IProps {
  currTabValue: ITabList;
}

const HomeTable = (props: IProps) => {
  const { currTabValue } = props;
  const showCheckbox = currTabValue !== ITabList.FULFILMENTS;
  return (
    <div>
      <FeaturedTable
        {...{
          columns: featuredColumns,
          rows: featuredRows,
          checkboxSelection: showCheckbox,
        }}
      />
    </div>
  );
};

export default HomeTable;
