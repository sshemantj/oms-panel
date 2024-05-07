import React from "react";
import BasicTable from "@/tables/basicTable";
import { basicTableColumns, basicTableRows } from "@/constants/tableConstant";

const HomeTable = () => {
  return (
    <div>
      <BasicTable {...{ columns: basicTableColumns, rows: basicTableRows }} />
    </div>
  );
};

export default HomeTable;
