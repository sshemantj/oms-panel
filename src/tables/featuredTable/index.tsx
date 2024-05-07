import React from "react";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";

interface IProps extends DataGridProps {
  columns: GridColDef[];
  rows: any[];
}

const FeaturedTable = (props: IProps) => {
  const { columns, rows, ...rest } = props;

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
        {...rest}
      />
    </div>
  );
};

export default FeaturedTable;
