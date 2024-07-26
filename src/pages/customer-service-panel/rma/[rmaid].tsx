import MainLayout from "@/layout/MainLayout";
import FeaturedTable from "@/tables/featuredTable";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Head from "next/head";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const sampleOrderItems = [
  {
    id: 0,
    image: "/path/to/image1.jpg",
    name: "Product 1",
    sku: "SKU1",
    isSample: "No",
    orderId: "123456",
    price: "100.00",
    qtyOrdered: 2,
    qtyAvailable: 1,
    stockQty: 5,
    returnQty: 1,
    returnReason: "Damaged",
    itemCondition: "New",
    resolution: "Replace",
  },
  {
    id: 1,

    image: "/path/to/image2.jpg",
    name: "Product 2",
    sku: "SKU2",
    isSample: "Yes",
    orderId: "123457",
    price: "200.00",
    qtyOrdered: 3,
    qtyAvailable: 2,
    stockQty: 3,
    returnQty: 1,
    returnReason: "Wrong Item",
    itemCondition: "Used",
    resolution: "Refund",
  },
];

const RmaScren = () => {
  const columns = [
    {
      field: "image",
      headerName: "Product Image",
      width: 130,
      renderCell: (params) => (
        <img src={params.value} alt="Product" width="50" height="50" />
      ),
    },
    {
      field: "name",
      headerName: "Product Name",
      width: 130,
      renderCell: (params) => (
        <Typography sx={{ marginTop: "10px" }} color="primary">
          {params.value}
        </Typography>
      ),
    },
    { field: "sku", headerName: "SKU", width: 100 },
    { field: "isSample", headerName: "Is Sample", width: 120 },
    { field: "orderId", headerName: "Order ID", width: 120 },
    { field: "price", headerName: "Price", width: 80 },
    { field: "qtyOrdered", headerName: "Qty Ordered", width: 120 },
    { field: "qtyAvailable", headerName: "Qty Available", width: 150 },
    { field: "stockQty", headerName: "Stock Quantity", width: 150 },
    {
      field: "returnQty",
      headerName: "Return Qty",
      width: 150,
      renderCell: (params) => (
        <TextField
          type="number"
          variant="outlined"
          size="small"
          sx={{ marginTop: "5px" }}
          defaultValue={params.value}
        />
      ),
    },
    {
      field: "returnReason",
      headerName: "Return Reason",
      width: 180,
      renderCell: (params) => (
        <TextField
          select
          sx={{ marginTop: "5px" }}
          variant="outlined"
          size="small"
          defaultValue={params.value}
        >
          <MenuItem value="Damaged">Damaged</MenuItem>
          <MenuItem value="Wrong Item">Wrong Item</MenuItem>
          <MenuItem value="Other">Other</MenuItem>
        </TextField>
      ),
    },
    {
      field: "itemCondition",
      headerName: "Item Condition",
      width: 180,
      renderCell: (params) => (
        <TextField
          select
          sx={{ marginTop: "5px" }}
          variant="outlined"
          size="small"
          defaultValue={params.value}
        >
          <MenuItem value="New">New</MenuItem>
          <MenuItem value="Used">Used</MenuItem>
          <MenuItem value="Refurbished">Refurbished</MenuItem>
        </TextField>
      ),
    },
    {
      field: "resolution",
      headerName: "Resolution",
      width: 180,
      renderCell: (params) => (
        <TextField
          sx={{ marginTop: "5px" }}
          variant="outlined"
          size="small"
          defaultValue={params.value}
        />
      ),
    },
  ];

  const [tableState, setTableState] = useState<{
    columns: GridColDef[];
    rows: [];
  }>({
    columns: columns,
    rows: [],
  });
  const fetchData = () => {
    try {
      // console.log("filters", filters);

      // const resultAction = await dispatch(
      //   getCSOrderList({ filters: orderListPayload })
      // );
      // const data = unwrapResult(resultAction);
      // console.log("data", data);
      if (sampleOrderItems.length) {
        const rows: [] = sampleOrderItems.map((item: any, index: number) => ({
          id: item.orderId,
          slno: index + 1,
          image: item.image,
          name: item.name,
          sku: item.sku,
          isSample: item.isSample,
          orderId: item.orderId,
          price: item.price,
          qtyOrdered: item.qtyOrdered,
          qtyAvailable: item.qtyAvailable,
          stockQty: item.stockQty,
          returnQty: item.returnQty,
          returnReason: item.returnReason,
          itemCondition: item.itemCondition,
          resolution: item.resolution,
        }));
        setTableState((prevTableState) => ({ ...prevTableState, rows }));
      } else {
        toast.error("No data found for cs panel");
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error);
    } finally {
      // setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Head>
        <title>OMS Panel</title>
      </Head>
      <MainLayout mainStyle={{ padding: 0 }}>
        <>
          <Grid container spacing={2} p={4}>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Order Information
                  </Typography>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Typography>Order ID: {"MAC-12132"}</Typography>
                      <Typography>RMA Raised By: {"CURRENT USER "}</Typography>
                      <Typography>RMA ID: {"JKDSJSF911"}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>Status: {"JKDSJSF911"}</Typography>
                      <Typography>Payment Method: {"JKDSJSF911"}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    Customer Information
                  </Typography>
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography>Customer Name</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Customer Number</Typography>
                    </Grid>
                    <Grid item>
                      <Typography>Customer Email</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Grid container spacing={2} p={4} mt={4}>
            <Box>
              <Typography variant="h5" mb={2}>
                Items in Order 123456
              </Typography>
              <Box mt={2}>
                {tableState.rows && tableState.rows.length ? (
                  <FeaturedTable
                    {...{
                      rows: tableState.rows,
                      columns: tableState.columns,
                      checkboxSelection: true,
                    }}
                  />
                ) : (
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Typography variant="h4">No detailss found</Typography>
                  </Box>
                )}
              </Box>
            </Box>
            <Grid item xs={11} display="flex" justifyContent="flex-end" mt={2}>
              <Button variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </>
      </MainLayout>
    </>
  );
};
export default RmaScren;
