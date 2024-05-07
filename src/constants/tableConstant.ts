import { GridColDef } from "@mui/x-data-grid";

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

export const basicTableRows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export const basicTableColumns = [
  "Dessert (100g serving)",
  "Fat",
  "Calories",
  "Carbs",
  "Protein",
];

export const featuredColumns: GridColDef[] = [
  //   { field: "id", headerName: "ID", width: 130 },
  { field: "customer", headerName: "Customer", width: 130, align: "left" },
  { field: "order", headerName: "Order", width: 130, align: "left" },
  {
    field: "fulfilmentRef",
    headerName: "Fulfilment Ref",
    // type: "number",
    width: 130,
    align: "left",
  },
  {
    field: "totalPrice",
    headerName: "Total Price",
    // type: "number",
    width: 130,
    align: "left",
  },
  {
    field: "deliveryType",
    headerName: "Delivery Type",
    // type: "number",
    width: 130,
    align: "left",
  },
  {
    field: "timeRemaining",
    headerName: "Time Remaining",
    // type: "number",
    width: 130,
    align: "left",
  },
  //   {
  //     field: "fullName",
  //     headerName: "Full name",
  //     description: "This column has a value getter and is not sortable.",
  //     sortable: false,
  //     width: 130,
  //     align: "left",
  //     valueGetter: (value, row) => `${row.customer || ""} ${row.order || ""}`,
  //   },
];

export const featuredRows = [
  {
    id: 1,
    order: "Snow",
    customer: "Jon",
    fulfilmentRef: 35,
    totalPrice: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 2,
    order: "Lannister",
    customer: "Cersei",
    fulfilmentRef: 42,
    totalPrice: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 3,
    order: "Lannister",
    customer: "Jaime",
    fulfilmentRef: 45,
    totalPrice: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 4,
    order: "Stark",
    customer: "Arya",
    fulfilmentRef: 16,
    totalPrice: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 5,
    order: "Targaryen",
    customer: "Daenerys",
    fulfilmentRef: null,
    totalPrice: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 6,
    order: "Melisandre",
    customer: null,
    fulfilmentRef: 150,
    totalPrice: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 7,
    order: "Clifford",
    customer: "Ferrara",
    fulfilmentRef: 44,
    totalPrice: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 8,
    order: "Frances",
    customer: "Rossini",
    fulfilmentRef: 36,
    totalPrice: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 9,
    order: "Roxie",
    customer: "Harvey",
    fulfilmentRef: 65,
    totalPrice: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
];
