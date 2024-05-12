import { GridColDef } from "@mui/x-data-grid";
import staticImg from "@/images/ss-logo.jpg";
import { unsplashimgurl } from "@/images/AllDataIcons";
import { ITabList } from "@/interfaces/home.interface";
import Link from "next/link";
import QuantityColumn from "@/modules/storeModule/subRoutesModule/pick/quantityColumn";

export const initialAllTableState = {
  [ITabList.FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.STANDARD_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.EXPRESS_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.EXCHANGES_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.CLICK_AND_COLLECT]: { rows: [], columns: [] },
};

export const initialAllTableIdsList = {
  [ITabList.FULFILMENTS]: [],
  [ITabList.STANDARD_FULFILMENTS]: [],
  [ITabList.EXPRESS_FULFILMENTS]: [],
  [ITabList.EXCHANGES_FULFILMENTS]: [],
  [ITabList.CLICK_AND_COLLECT]: [],
};

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

export const awaitingPickColumns: GridColDef[] = [
  //   { field: "id", headerName: "ID", width: 130 },
  {
    field: "image",
    headerName: "Image",
    width: 150,
    type: "custom",
    align: "left",
    renderCell: (params) => (
      <img width={50} height={50} src={params.value} alt="image" />
    ),
  },
  {
    field: "productName",
    headerName: "Product Name",
    width: 160,
    align: "left",
  },
  {
    field: "soNumber",
    headerName: "SO Number",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "estimateDate",
    headerName: "Estimate Date",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "sku",
    headerName: "SKU",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "fulfillmentRef",
    headerName: "Fulfillment Ref",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "brandValue",
    headerName: "Brand Value",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "eanValue",
    headerName: "EAN Value",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    // type: "number",
    width: 160,
    align: "left",
  },
];

export const awaitingPickRows = [
  {
    id: 1,
    image: unsplashimgurl,
    productName: "Jon",
    soNumber: Math.round(Math.random() * 100),
    fulfillmentRef: 35,
    estimateDate: new Date().toLocaleDateString(),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 2,
    image: unsplashimgurl,
    productName: "Cersei",
    soNumber: Math.round(Math.random() * 100),
    fulfillmentRef: 42,
    estimateDate: new Date().toLocaleDateString(),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 3,
    image: unsplashimgurl,
    productName: "Jaime",
    soNumber: Math.round(Math.random() * 100),
    fulfillmentRef: 45,
    estimateDate: new Date().toLocaleDateString(),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 4,
    image: unsplashimgurl,
    productName: "Arya",
    soNumber: Math.round(Math.random() * 100),
    fulfillmentRef: 16,
    estimateDate: new Date().toLocaleDateString(),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 5,
    image: unsplashimgurl,
    productName: "Daenerys",
    soNumber: Math.round(Math.random() * 100),
    fulfillmentRef: null,
    estimateDate: new Date().toLocaleDateString(),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 6,
    image: unsplashimgurl,
    productName: null,
    soNumber: Math.round(Math.random() * 100),
    fulfillmentRef: 150,
    estimateDate: new Date().toLocaleDateString(),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 7,
    image: unsplashimgurl,
    productName: "Ferrara",
    soNumber: Math.round(Math.random() * 100),
    fulfillmentRef: 44,
    estimateDate: new Date().toLocaleDateString(),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 8,
    image: unsplashimgurl,
    productName: "Rossini",
    soNumber: Math.round(Math.random() * 100),
    fulfillmentRef: 36,
    estimateDate: new Date().toLocaleDateString(),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 9,
    image: unsplashimgurl,
    productName: "Harvey",
    soNumber: Math.round(Math.random() * 100),
    fulfillmentRef: 65,
    estimateDate: new Date().toLocaleDateString(),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
];

export const inProgressColumns: GridColDef[] = [
  //   { field: "id", headerName: "ID", width: 130 },
  { field: "waveId", headerName: "Wave Id", width: 170, align: "left" },
  { field: "step", headerName: "Step", width: 170, align: "left" },
  {
    field: "fulfilment",
    headerName: "Fulfilment",
    // type: "number",
    width: 170,
    align: "left",
  },
  {
    field: "userName",
    headerName: "User Name",
    // type: "number",
    width: 170,
    align: "left",
  },
  {
    field: "createdOn",
    headerName: "Created On",
    // type: "number",
    width: 170,
    align: "left",
  },
  {
    field: "updatedOn",
    headerName: "Updated On",
    // type: "number",
    width: 170,
    align: "left",
  },
  {
    field: "link",
    headerName: "LINK",
    // type: "number",
    width: 170,
    align: "left",
    valueGetter: (value, row) => `${row.step}`,
    renderCell: (params) => {
      return (
        <Link
          style={{ color: "blue", textDecoration: "underline" }}
          href={`${params.value}`.toLowerCase() || ""}
        >
          RESUME WAVE
        </Link>
      );
    },
  },
];

export const inProgressRows = [
  {
    id: 1,
    waveId: "Snow",
    step: "PICK",
    fulfilment: 35,
    userName: Math.round(Math.random() * 100),
    createdOn: new Date().toLocaleString(),
    updatedOn: new Date().toLocaleString(),
  },
  {
    id: 2,
    waveId: "Lannister",
    step: "DISPATCH",
    fulfilment: 42,
    userName: Math.round(Math.random() * 100),
    createdOn: new Date().toLocaleString(),
    updatedOn: new Date().toLocaleString(),
  },
  {
    id: 3,
    waveId: "Lannister",
    step: "PACK",
    fulfilment: 45,
    userName: Math.round(Math.random() * 100),
    createdOn: new Date().toLocaleString(),
    updatedOn: new Date().toLocaleString(),
  },
  {
    id: 4,
    waveId: "Stark",
    step: "PICK",
    fulfilment: 16,
    userName: Math.round(Math.random() * 100),
    createdOn: new Date().toLocaleString(),
    updatedOn: new Date().toLocaleString(),
  },
  {
    id: 5,
    waveId: "Targaryen",
    step: "DISPATCH",
    fulfilment: null,
    userName: Math.round(Math.random() * 100),
    createdOn: new Date().toLocaleString(),
    updatedOn: new Date().toLocaleString(),
  },
  {
    id: 6,
    waveId: "Melisandre",
    step: "PACK",
    fulfilment: 150,
    userName: Math.round(Math.random() * 100),
    createdOn: new Date().toLocaleString(),
    updatedOn: new Date().toLocaleString(),
  },
  {
    id: 7,
    waveId: "Clifford",
    step: "PICK",
    fulfilment: 44,
    userName: Math.round(Math.random() * 100),
    createdOn: new Date().toLocaleString(),
    updatedOn: new Date().toLocaleString(),
  },
  {
    id: 8,
    waveId: "Frances",
    step: "DISPATCH",
    fulfilment: 36,
    userName: Math.round(Math.random() * 100),
    createdOn: new Date().toLocaleString(),
    updatedOn: new Date().toLocaleString(),
  },
  {
    id: 9,
    waveId: "Roxie",
    step: "PACK",
    fulfilment: 65,
    userName: Math.round(Math.random() * 100),
    createdOn: new Date().toLocaleString(),
    updatedOn: new Date().toLocaleString(),
  },
];

export const pickScreenColumns: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    width: 150,
    type: "custom",
    align: "left",
    renderCell: (params) => (
      <img width={50} height={50} src={params.value} alt="image" />
    ),
  },
  {
    field: "productName",
    headerName: "Product Name",
    width: 160,
    align: "left",
  },
  {
    field: "sku",
    headerName: "SKU",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "price",
    headerName: "Price",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "brandValue",
    headerName: "Brand Value",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "eanValue",
    headerName: "EAN Value",
    // type: "number",
    width: 120,
    align: "left",
  },
  {
    field: "quantity",
    headerName: "Quantity",
    // type: "number",
    width: 120,
    align: "left",
  },
  {
    field: "pickQuantity",
    headerName: "Pick Quantity",
    // type: "number",
    width: 180,
    align: "left",
    valueGetter: (value, row) => `${row.quantity}`,
    renderCell: (params) => {
      return <QuantityColumn type={"pick"} quantity={params.value} />;
    },
  },
  {
    field: "additional",
    headerName: "Addition Quantity",
    // type: "number",
    width: 180,
    align: "left",
    valueGetter: (value, row) => `${row.quantity}`,
    renderCell: (params) => {
      return <QuantityColumn type={"additional"} quantity={params.value} />;
    },
  },
];

export const pickScreenRows = [
  {
    id: 1,
    image: unsplashimgurl,
    productName: "Jon",
    price: Math.round(Math.random() * 100),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 2,
    image: unsplashimgurl,
    productName: "Cersei",
    price: Math.round(Math.random() * 100),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 3,
    image: unsplashimgurl,
    productName: "Jaime",
    price: Math.round(Math.random() * 100),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 4,
    image: unsplashimgurl,
    productName: "Arya",
    price: Math.round(Math.random() * 100),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 5,
    image: unsplashimgurl,
    productName: "Daenerys",
    price: Math.round(Math.random() * 100),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 6,
    image: unsplashimgurl,
    productName: null,
    price: Math.round(Math.random() * 100),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 7,
    image: unsplashimgurl,
    productName: "Ferrara",
    price: Math.round(Math.random() * 100),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 8,
    image: unsplashimgurl,
    productName: "Rossini",
    price: Math.round(Math.random() * 100),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
  {
    id: 9,
    image: unsplashimgurl,
    productName: "Harvey",
    price: Math.round(Math.random() * 100),
    sku: "demo sku",
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
    quantity: Math.round(Math.random() * 100),
    deliveryType: "manual",
    timeRemaining: `${Math.ceil(Math.random() * 10)} days`,
  },
];
