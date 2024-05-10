import React from "react";
import { DataGrid, DataGridProps, GridColDef } from "@mui/x-data-grid";

export interface IFeaturedTableProps extends DataGridProps {
  columns: GridColDef[];
  rows: any[];
}

const FeaturedTable = (props: IFeaturedTableProps) => {
  const {
    columns,
    rows,
    processRowUpdate,
    onRowSelectionModelChange,
    ...rest
  } = props;

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        sx={{ maxWidth: "calc(100vw - 110px)" }}
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        processRowUpdate={processRowUpdate}
        onRowSelectionModelChange={onRowSelectionModelChange}
        pageSizeOptions={[10, 30, 50, 100]}
        disableColumnResize
        {...rest}
      />
    </div>
  );
};

export default FeaturedTable;
