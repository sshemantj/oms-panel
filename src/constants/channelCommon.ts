import { GridColDef } from "@mui/x-data-grid";

export const channelColumns: GridColDef[] = [
  {
    field: "id",
    headerName: "Id",
    width: 120,
    editable: false,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "channelid",
    headerName: "Channelid",
    type: "string",
    width: 200,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "channelname",
    headerName: "Channel Name",
    type: "string",
    width: 200,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "description",
    headerName: "Description",
    type: "string",
    width: 250,
    editable: true,
    align: "center",
    headerAlign: "center",
  },
  // {
  //   field: "isactive",
  //   headerName: "is Active",
  //   type: "string",
  //   width: 180,
  //   editable: true,
  //   align: "center",
  //   headerAlign: "center",
  // },
];
