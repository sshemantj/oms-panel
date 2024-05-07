import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IProps {
  columns: GridColDef[];
  rows: any[];
}

const FeaturedTable = (props: IProps) => {
  const { columns, rows } = props;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 30, 50, 100]}
        // checkboxSelection
        disableColumnResize
      />
    </div>
  );
};

export default FeaturedTable;
