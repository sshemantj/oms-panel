import React from "react";
import { featuredColumns, featuredRows } from "@/constants/tableConstant";
import FeaturedTable from "@/tables/featuredTable";

const HomeTable = () => {
  return (
    <div>
      <FeaturedTable {...{ columns: featuredColumns, rows: featuredRows }} />
    </div>
  );
};

export default HomeTable;
