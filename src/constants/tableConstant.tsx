import { GridColDef } from "@mui/x-data-grid";
import staticImg from "@/images/ss-logo.jpg";
import { unsplashimgurl } from "@/images/AllDataIcons";
import { ITabList } from "@/interfaces/home.interface";
import Link from "next/link";
import QuantityColumn from "@/modules/storeModule/subRoutesModule/pick/quantityColumn";
import PickImage from "@/modules/storeModule/subRoutesModule/pick/pickImage";
import { Box, Button, Typography } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import { IAllRoutes } from "./allRoutes";

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
export const initialAllFulfillmentTableState = {
  [ITabList.FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.STANDARD_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.EXPRESS_FULFILMENTS]: { rows: [], columns: [] },
  [ITabList.CLICK_AND_COLLECT]: { rows: [], columns: [] },
};

export const initialAllFulfillmentTableIdsList = {
  [ITabList.FULFILMENTS]: [],
  [ITabList.STANDARD_FULFILMENTS]: [],
  [ITabList.EXPRESS_FULFILMENTS]: [],
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
  {
    field: "edt",
    headerName: "ETD",
    width: 200,
    align: "left",
    renderCell: (params) => {
      const date = new Date();
      date.setDate(date.getDate() + 7);
      return `${date.toDateString()}`;
    },
  },
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
    field: "consignmentStatus",
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
    renderCell: (params) => <PickImage url={params.value} />,
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
    width: 350,
    align: "left",
    valueGetter: (value, row) => `${row.quantity}`,
    renderCell: (params) => {
      return <QuantityColumn type={"pick"} quantity={params.value} />;
    },
  },
  {
    field: "additional",
    headerName: "Additional Defective Quantity",
    // type: "number",
    width: 220,
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
export const orderRefColumns: GridColDef[] = [
  {
    field: "orderReference",
    headerName: "Order Reference",
    width: 160,
    align: "left",
  },
  {
    field: "fullfilmentsRef",
    headerName: "Fullfilment Ref",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "customerName",
    headerName: "Customer Name",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "orderType",
    headerName: "Order Type",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "fullFilmentStatus",
    headerName: "Fullfilments Status",
    // type: "number",
    width: 120,
    align: "left",
  },
];

export const orderRefRows = [
  {
    id: 1,
    orderReference: "Jon",
    fullfilmentsRef: "demo sku",
    customerName: "product",
    orderType: "manual",
    fullFilmentStatus: "FULFILLED",
  },
];

export const orderRefColumns2: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    width: 150,
    type: "custom",
    align: "left",
    renderCell: (params) => <PickImage url={params.value} />,
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
    field: "filledQuantity",
    headerName: "Filled Quantity",
    // type: "number",
    width: 120,
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
];

export const orderRefRows2 = [
  {
    id: 1,
    image: unsplashimgurl,
    productName: "Jon",
    sku: "demo sku",
    filledQuantity: Math.round(Math.random() * 100),
    brandValue: Math.round(Math.random() * 100),
    eanValue: Math.round(Math.random() * 100),
  },
];

export const carrierBookingColumns: GridColDef[] = [
  { field: "order", headerName: "Order", width: 130, align: "left" },
  {
    field: "fulfilment",
    headerName: "Fulfilment",
    // type: "number",
    width: 130,
    align: "left",
  },
  { field: "customer", headerName: "Customer", width: 130, align: "left" },
  {
    field: "orderType",
    headerName: "Order Type",
    // type: "number",
    width: 160,
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
    field: "invoiceNumber",
    headerName: "Invoice Number",
    // type: "number",
    width: 130,
    align: "left",
  },
  {
    field: "fulfilmentStatus",
    headerName: "Fulfilment Status",
    // type: "number",
    width: 130,
    align: "left",
  },
  {
    field: "carrier",
    headerName: "Carrier",
    // type: "number",
    width: 130,
    align: "left",
  },
  {
    field: "consignmentStatus",
    headerName: "Processing",
    // type: "number",
    width: 130,
    align: "left",
  },
  {
    field: "assingCarrier",
    headerName: "Assign Carrier",
    // type: "number",
    width: 130,
    align: "left",
  },
  {
    field: "invoiceButton",
    headerName: "Invoice Button",
    // type: "number",
    width: 130,
    align: "left",
    renderCell: (params) => (
      <Button variant="outlined">
        <PrintIcon /> INVOICE
      </Button>
    ),
  },
  {
    field: "labelButton",
    headerName: "Label Button",
    // type: "number",
    width: 130,
    align: "left",
    renderCell: (params) => (
      <Button variant="outlined">
        <PrintIcon /> LABEL
      </Button>
    ),
  },
];

export const carrierBookingRows = [
  {
    id: 1,
    order: "Snow",
    customer: "Jon",
    fulfilment: 35,
    orderType: "manual",
    deliveryType: "manual",
    invoiceNumber: `${Math.ceil(Math.random() * 10000000)}`,
    fulfilmentStatus: "Fulfilled",
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 2,
    order: "Lannister",
    customer: "Cersei",
    fulfilment: 42,
    orderType: "manual",
    deliveryType: "manual",
    invoiceNumber: `${Math.ceil(Math.random() * 10000000)}`,
    fulfilmentStatus: "Fulfilled",
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 3,
    order: "Lannister",
    customer: "Jaime",
    fulfilment: 45,
    orderType: "manual",
    deliveryType: "manual",
    invoiceNumber: `${Math.ceil(Math.random() * 10000000)}`,
    fulfilmentStatus: "Fulfilled",
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 4,
    order: "Stark",
    customer: "Arya",
    fulfilment: 16,
    orderType: "manual",
    deliveryType: "manual",
    invoiceNumber: `${Math.ceil(Math.random() * 10000000)}`,
    fulfilmentStatus: "Fulfilled",
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 5,
    order: "Targaryen",
    customer: "Daenerys",
    fulfilment: null,
    orderType: "manual",
    deliveryType: "manual",
    invoiceNumber: `${Math.ceil(Math.random() * 10000000)}`,
    fulfilmentStatus: "Fulfilled",
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 6,
    order: "Melisandre",
    customer: null,
    fulfilment: 150,
    orderType: "manual",
    deliveryType: "manual",
    invoiceNumber: `${Math.ceil(Math.random() * 10000000)}`,
    fulfilmentStatus: "Fulfilled",
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 7,
    order: "Clifford",
    customer: "Ferrara",
    fulfilment: 44,
    orderType: "manual",
    deliveryType: "manual",
    invoiceNumber: `${Math.ceil(Math.random() * 10000000)}`,
    fulfilmentStatus: "Fulfilled",
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 8,
    order: "Frances",
    customer: "Rossini",
    fulfilment: 36,
    orderType: "manual",
    deliveryType: "manual",
    invoiceNumber: `${Math.ceil(Math.random() * 10000000)}`,
    fulfilmentStatus: "Fulfilled",
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 9,
    order: "Roxie",
    customer: "Harvey",
    fulfilment: 65,
    orderType: "manual",
    deliveryType: "manual",
    invoiceNumber: `${Math.ceil(Math.random() * 10000000)}`,
    fulfilmentStatus: "Fulfilled",
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
];
export const carrierCollectionsColumns: GridColDef[] = [
  { field: "orderRef", headerName: "Order Ref", width: 130, align: "left" },
  { field: "customer", headerName: "Customer", width: 130, align: "left" },
  {
    field: "awbNumber",
    headerName: "AWB Number",
    // type: "number",
    width: 130,
    align: "left",
    renderCell: (params) => (
      <Typography sx={{ color: "blue", textDecoration: "underline" }}>
        {params.value}
      </Typography>
    ),
  },
  {
    field: "consignmentStatus",
    headerName: "Consignment Status",
    // type: "number",
    width: 160,
    align: "left",
  },
  {
    field: "orderType",
    headerName: "Order Type",
    // type: "number",
    width: 160,
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
    field: "carrier",
    headerName: "Carrier",
    // type: "number",
    width: 130,
    align: "left",
  },
];

export const carrierCollectionsRows = [
  {
    id: 1,
    orderRef: "Snow",
    customer: "Jon",
    orderType: "manual",
    deliveryType: "manual",
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 2,
    orderRef: "Lannister",
    customer: "Cersei",
    orderType: "manual",
    deliveryType: "manual",
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 3,
    orderRef: "Lannister",
    customer: "Jaime",
    orderType: "manual",
    deliveryType: "manual",
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 4,
    orderRef: "Stark",
    customer: "Arya",
    orderType: "manual",
    deliveryType: "manual",
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 5,
    orderRef: "Targaryen",
    customer: "Daenerys",
    orderType: "manual",
    deliveryType: "manual",
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 6,
    orderRef: "Melisandre",
    customer: null,
    orderType: "manual",
    deliveryType: "manual",
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 7,
    orderRef: "Clifford",
    customer: "Ferrara",
    orderType: "manual",
    deliveryType: "manual",
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 8,
    orderRef: "Frances",
    customer: "Rossini",
    orderType: "manual",
    deliveryType: "manual",
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
  {
    id: 9,
    orderRef: "Roxie",
    customer: "Harvey",
    orderType: "manual",
    deliveryType: "manual",
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    carrier: "Default Carrier",
    consignmentStatus: "Processing",
    assingCarrier: "",
  },
];
export const fulfillmentColumns: GridColDef[] = [
  {
    field: "idCustom",
    headerName: "ID",
    // type: "number",
    width: 200,
    align: "left",
    renderCell: (params) => (
      <Link href="/fulfillments/fulfillments-details">
        <Typography sx={{ color: "blue", textDecoration: "none" }}>
          {params.value}
        </Typography>
      </Link>
    ),
  },
  {
    field: "ref",
    headerName: "Ref",
    // type: "number",
    width: 200,
    align: "left",
  },
  {
    field: "deliveryType",
    headerName: "Delivery Type",
    // type: "number",
    width: 200,
    align: "left",
  },
  {
    field: "status",
    headerName: "Status",
    // type: "number",
    width: 200,
    align: "left",
  },
];
export const fulfillmentsRows = [
  {
    id: 1,
    ref: "Snow",
    deliveryType: "manual",
    idCustom: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Fullfilled",
  },
  {
    id: 2,
    ref: "Lannister",
    deliveryType: "manual",
    idCustom: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Waiting carrier pickup",
  },
  {
    id: 3,
    ref: "Lannister",
    deliveryType: "manual",
    idCustom: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Fullfilled",
  },
  {
    id: 4,
    ref: "Stark",
    deliveryType: "manual",
    idCustom: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Waiting carrier pickup",
  },
  {
    id: 5,
    ref: "Targaryen",
    deliveryType: "manual",
    idCustom: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Fullfilled",
  },
  {
    id: 6,
    ref: "Melisandre",
    deliveryType: "manual",
    idCustom: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Waiting carrier pickup",
  },
  {
    id: 7,
    ref: "Clifford",
    deliveryType: "manual",
    idCustom: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Fullfilled",
  },
  {
    id: 8,
    ref: "Frances",
    deliveryType: "manual",
    idCustom: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Fullfilled",
  },
  {
    id: 9,
    ref: "Roxie",
    deliveryType: "manual",
    idCustom: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Fullfilled",
  },
];
export const fulfillmentTableColumns: GridColDef[] = [
  {
    field: "productName",
    headerName: "ProductName",
    // type: "number",
    width: 200,
    align: "left",
  },
  {
    field: "skuRef",
    headerName: "SKU Ref",
    // type: "number",
    width: 200,
    align: "left",
  },
  {
    field: "requestedQuantity",
    headerName: "Requested Quantity",
    // type: "number",
    width: 200,
    align: "left",
  },
  {
    field: "filledQuantity",
    headerName: "Filled Quantity",
    // type: "number",
    width: 200,
    align: "left",
  },
  {
    field: "rejectedQuantity",
    headerName: "Reject Quantity",
    // type: "number",
    width: 200,
    align: "left",
  },
];
export const fulfillmentsTableRows = [
  {
    id: 1,
    productName: `${Math.ceil(Math.random() * 10000000)}`,
    skuRef: "Snow",
    requestedQuantity: `${Math.round(Math.random() * 10)}`,
    filledQuantity: `${Math.round(Math.random() * 10)}`,
    rejectedQuantity: `${Math.round(Math.random() * 10)}`,
  },
  {
    id: 2,
    productName: `${Math.ceil(Math.random() * 10000000)}`,
    skuRef: "Lannister",
    requestedQuantity: `${Math.round(Math.random() * 10)}`,
    filledQuantity: `${Math.round(Math.random() * 10)}`,
    rejectedQuantity: `${Math.round(Math.random() * 10)}`,
  },
  {
    id: 3,
    productName: `${Math.ceil(Math.random() * 10000000)}`,
    skuRef: "Lannister",
    requestedQuantity: `${Math.round(Math.random() * 10)}`,
    filledQuantity: `${Math.round(Math.random() * 10)}`,
    rejectedQuantity: `${Math.round(Math.random() * 10)}`,
  },
  {
    id: 4,
    productName: `${Math.ceil(Math.random() * 10000000)}`,
    skuRef: "Stark",
    requestedQuantity: `${Math.round(Math.random() * 10)}`,
    filledQuantity: `${Math.round(Math.random() * 10)}`,
    rejectedQuantity: `${Math.round(Math.random() * 10)}`,
  },
  {
    id: 5,
    productName: `${Math.ceil(Math.random() * 10000000)}`,
    skuRef: "Targaryen",
    requestedQuantity: `${Math.round(Math.random() * 10)}`,
    filledQuantity: `${Math.round(Math.random() * 10)}`,
    rejectedQuantity: `${Math.round(Math.random() * 10)}`,
  },
  {
    id: 6,
    productName: `${Math.ceil(Math.random() * 10000000)}`,
    skuRef: "Melisandre",
    requestedQuantity: `${Math.round(Math.random() * 10)}`,
    filledQuantity: `${Math.round(Math.random() * 10)}`,
    rejectedQuantity: `${Math.round(Math.random() * 10)}`,
  },
  {
    id: 7,
    productName: `${Math.ceil(Math.random() * 10000000)}`,
    skuRef: "Clifford",
    requestedQuantity: `${Math.round(Math.random() * 10)}`,
    filledQuantity: `${Math.round(Math.random() * 10)}`,
    rejectedQuantity: `${Math.round(Math.random() * 10)}`,
  },
  {
    id: 8,
    productName: `${Math.ceil(Math.random() * 10000000)}`,
    skuRef: "Frances",
    requestedQuantity: `${Math.round(Math.random() * 10)}`,
    filledQuantity: `${Math.round(Math.random() * 10)}`,
    rejectedQuantity: `${Math.round(Math.random() * 10)}`,
  },
  {
    id: 9,
    productName: `${Math.ceil(Math.random() * 10000000)}`,
    skuRef: "Roxie",
    requestedQuantity: `${Math.round(Math.random() * 10)}`,
    filledQuantity: `${Math.round(Math.random() * 10)}`,
    rejectedQuantity: `${Math.round(Math.random() * 10)}`,
  },
];
export const returnsColumn: GridColDef[] = [
  {
    field: "returnOrderRef",
    headerName: "Return Order Ref",
    width: 130,
    align: "left",
    renderCell: (params) => (
      <Link
        style={{
          color: "blue",
          textDecoration: "underline",
          textUnderlineOffset: "4px",
        }}
        href={`/${IAllRoutes.RETURNS}/${params.value}`}
      >
        {params.value}
      </Link>
    ),
  },
  { field: "type", headerName: "Type", width: 110, align: "left" },
  {
    field: "returnType",
    headerName: "Return type (RMA/RTO)",
    width: 110,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography variant="subtitle2" textTransform="capitalize">
          Return type <br /> (RMA/RTO)
        </Typography>
      );
    },
  },
  { field: "orderRef", headerName: "Order Ref", width: 110, align: "left" },
  {
    field: "status",
    headerName: "Status",
    width: 110,
    align: "left",
  },
  {
    field: "lodgedLocation",
    headerName: "Lodged Location",
    width: 130,
    align: "left",
  },
  {
    field: "rmaNumber",
    headerName: "RMA Number",
    width: 120,
    align: "left",
  },
  {
    field: "awbNumber",
    headerName: "AWB Number",
    width: 120,
    align: "left",
  },
  {
    field: "destination",
    headerName: "Destination",
    width: 110,
    align: "left",
  },
  {
    field: "performQc",
    headerName: "Action",
    width: 160,
    align: "left",
  },
];
export const returnsRows = [
  {
    id: 1,
    orderRef: "Snow",
    returnOrderRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    type: "STANDARD",
    rmaNumber: Math.ceil(Math.random() * 10000),
    destination: 901,
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Processing",
    lodgedLocation: 901,
    returnType: "RMA",
  },
  {
    id: 2,
    orderRef: "Lannister",
    returnOrderRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    type: "STANDARD",
    rmaNumber: Math.ceil(Math.random() * 10000),
    destination: 901,
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Processing",
    lodgedLocation: 901,
    returnType: "RMA",
  },
  {
    id: 3,
    orderRef: "Lannister",
    returnOrderRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    type: "STANDARD",
    rmaNumber: Math.ceil(Math.random() * 10000),
    destination: 901,
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Processing",
    lodgedLocation: 901,
    returnType: "RMA",
  },
  {
    id: 4,
    orderRef: "Stark",
    returnOrderRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    type: "STANDARD",
    rmaNumber: Math.ceil(Math.random() * 10000),
    destination: 901,
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Processing",
    lodgedLocation: 901,
    returnType: "RMA",
  },
  {
    id: 5,
    orderRef: "Targaryen",
    returnOrderRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    type: "STANDARD",
    rmaNumber: Math.ceil(Math.random() * 10000),
    destination: 901,
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Processing",
    lodgedLocation: 901,
    returnType: "RMA",
  },
  {
    id: 6,
    orderRef: "Melisandre",
    returnOrderRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    type: "STANDARD",
    rmaNumber: Math.ceil(Math.random() * 10000),
    destination: 901,
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Processing",
    lodgedLocation: 901,
    returnType: "RMA",
  },
  {
    id: 7,
    orderRef: "Clifford",
    returnOrderRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    type: "STANDARD",
    rmaNumber: Math.ceil(Math.random() * 10000),
    destination: 901,
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Processing",
    lodgedLocation: 901,
    returnType: "RMA",
  },
  {
    id: 8,
    orderRef: "Frances",
    returnOrderRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    type: "STANDARD",
    rmaNumber: Math.ceil(Math.random() * 10000),
    destination: 901,
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Processing",
    lodgedLocation: 901,
    returnType: "RMA",
  },
  {
    id: 9,
    orderRef: "Roxie",
    returnOrderRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    type: "STANDARD",
    rmaNumber: Math.ceil(Math.random() * 10000),
    destination: 901,
    awbNumber: `${Math.ceil(Math.random() * 10000000)}`,
    status: "Processing",
    lodgedLocation: 901,
    returnType: "RMA",
  },
];
export const returnIdFirstTableColumn: GridColDef[] = [
  {
    field: "returnItemRef",
    headerName: "ReturnItemRef",
    width: 130,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {""}
        </Typography>
      );
    },
  },
  {
    field: "orderItemRef",
    headerName: "OrderItemRef",
    width: 150,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {""}
        </Typography>
      );
    },
  },
  {
    field: "returnQuantity",
    headerName: "ReturnQuantity",
    width: 130,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "productRef",
    headerName: "ProductRef",
    width: 160,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {""}
        </Typography>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {""}
        </Typography>
      );
    },
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 160,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {""}
        </Typography>
      );
    },
  },
  {
    field: "condition",
    headerName: "Condition",
    width: 130,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {""}
        </Typography>
      );
    },
  },
  {
    field: "comment",
    headerName: "Comment",
    width: 130,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {""}
        </Typography>
      );
    },
  },
];
export const returnIdFirstTableRows = [
  {
    id: 1,
    returnQuantity: Math.ceil(Math.random() * 10),
    returnItemRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    orderItemRef: `MAC_SH${Math.ceil(Math.random() * 100)}_${Math.ceil(
      Math.random() * 10000
    )}`,
    reason: "product is damanged",
    comment: "close to expiry",
    condition: "As new condition",
    productRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    status: "CREATED",
  },
];
export const returnIdColumn: GridColDef[] = [
  {
    field: "returnItemRef",
    headerName: "ReturnItemRef",
    width: 150,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "orderItemRef",
    headerName: "OrderItemRef",
    width: 150,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "returnQuantity",
    headerName: "ReturnQuantity",
    width: 150,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "productRef",
    headerName: "ProductRef",
    width: 160,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "status",
    headerName: "Status",
    width: 150,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "reason",
    headerName: "Reason",
    width: 160,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "condition",
    headerName: "Condition",
    width: 150,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "comment",
    headerName: "Comment",
    width: 150,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
];
export const returnIdRows = [
  {
    id: 1,
    returnQuantity: Math.ceil(Math.random() * 10),
    returnItemRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    orderItemRef: `MAC_SH${Math.ceil(Math.random() * 100)}_${Math.ceil(
      Math.random() * 10000
    )}`,
    reason: "product is damanged",
    comment: "close to expiry",
    condition: "As new condition",
    productRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    status: "CREATED",
  },
  {
    id: 2,
    returnQuantity: Math.ceil(Math.random() * 10),
    returnItemRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    orderItemRef: `MAC_SH${Math.ceil(Math.random() * 100)}_${Math.ceil(
      Math.random() * 10000
    )}`,
    reason: "product is damanged",
    comment: "close to expiry",
    condition: "As new condition",
    productRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    status: "CREATED",
  },
  {
    id: 3,
    returnQuantity: Math.ceil(Math.random() * 10),
    returnItemRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    orderItemRef: `MAC_SH${Math.ceil(Math.random() * 100)}_${Math.ceil(
      Math.random() * 10000
    )}`,
    reason: "product is damanged",
    comment: "close to expiry",
    condition: "As new condition",
    productRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    status: "CREATED",
  },
  {
    id: 4,
    returnQuantity: Math.ceil(Math.random() * 10),
    returnItemRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    orderItemRef: `MAC_SH${Math.ceil(Math.random() * 100)}_${Math.ceil(
      Math.random() * 10000
    )}`,
    reason: "product is damanged",
    comment: "close to expiry",
    condition: "As new condition",
    productRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    status: "CREATED",
  },
  {
    id: 5,
    returnQuantity: Math.ceil(Math.random() * 10),
    returnItemRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    orderItemRef: `MAC_SH${Math.ceil(Math.random() * 100)}_${Math.ceil(
      Math.random() * 10000
    )}`,
    reason: "product is damanged",
    comment: "close to expiry",
    condition: "As new condition",
    productRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    status: "CREATED",
  },
  {
    id: 6,
    returnQuantity: Math.ceil(Math.random() * 10),
    returnItemRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    orderItemRef: `MAC_SH${Math.ceil(Math.random() * 100)}_${Math.ceil(
      Math.random() * 10000
    )}`,
    reason: "product is damanged",
    comment: "close to expiry",
    condition: "As new condition",
    productRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    status: "CREATED",
  },
  {
    id: 7,
    returnQuantity: Math.ceil(Math.random() * 10),
    returnItemRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    orderItemRef: `MAC_SH${Math.ceil(Math.random() * 100)}_${Math.ceil(
      Math.random() * 10000
    )}`,
    reason: "product is damanged",
    comment: "close to expiry",
    condition: "As new condition",
    productRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    status: "CREATED",
  },
  {
    id: 8,
    returnQuantity: Math.ceil(Math.random() * 10),
    returnItemRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    orderItemRef: `MAC_SH${Math.ceil(Math.random() * 100)}_${Math.ceil(
      Math.random() * 10000
    )}`,
    reason: "product is damanged",
    comment: "close to expiry",
    condition: "As new condition",
    productRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    status: "CREATED",
  },
  {
    id: 9,
    returnQuantity: Math.ceil(Math.random() * 10),
    returnItemRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    orderItemRef: `MAC_SH${Math.ceil(Math.random() * 100)}_${Math.ceil(
      Math.random() * 10000
    )}`,
    reason: "product is damanged",
    comment: "close to expiry",
    condition: "As new condition",
    productRef: "Mac_" + Math.ceil(Math.random() * 100000000),
    status: "CREATED",
  },
];
export const returnModalColumns: GridColDef[] = [
  {
    field: "SKU",
    headerName: "ReturnItemRef",
    width: 120,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "Product",
    headerName: "OrderItemRef",
    width: 120,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "brand",
    headerName: "Brand",
    width: 120,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "styleSize",
    headerName: "Style / Size",
    width: 120,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "quantity",
    headerName: "Quantity",
    width: 120,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
  {
    field: "refundAmount",
    headerName: "Refund Amount",
    width: 120,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          Refund <br /> Amount
        </Typography>
      );
    },
  },
  {
    field: "recievedQnt",
    headerName: "Recieved Quantity",
    width: 120,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          Recieved <br /> Quantity
        </Typography>
      );
    },
  },
  {
    field: "inventoryZone",
    headerName: "Inventory Zone",
    width: 120,
    align: "left",
    editable: true,
    type: "number",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          Inventory <br /> Zone
        </Typography>
      );
    },
  },
  {
    field: "damagedZone",
    headerName: "Damaged Zone",
    width: 120,
    align: "left",
    editable: true,
    type: "number",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          Damaged <br /> Zone
        </Typography>
      );
    },
  },
  {
    field: "comments",
    headerName: "Comment",
    width: 120,
    align: "left",
    renderHeader: (params) => {
      return (
        <Typography
          fontWeight={600}
          variant="subtitle2"
          textTransform="capitalize"
        >
          {params.field}
        </Typography>
      );
    },
  },
];
export const returnModalRows = [
  {
    id: 1,
    brand: "Tresmodes",
    SKU: Math.ceil(Math.random() * 100000000),
    Product: `Mens casuale sport shoes`,
    refundAmount: Math.ceil(Math.random() * 100000),
    comments: "null",
    recievedQnt: Math.ceil(Math.random() * 100000),
    styleSize: "Black / 44",
    quantity: Math.ceil(Math.random() * 100),
    inventoryZone: 1,
    damagedZone: 0,
  },
];
