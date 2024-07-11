import {
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import React, { useState } from "react";

interface IConsignmentItem {
  productName: string;
  brand: string;
  sku: string;
  ean: string;
  price: string;
  caNumber: string;
  quantityToPack: string;
  size: string;
  colour: string;
}

const itemsInConsignment: IConsignmentItem[] = [
  {
    productName: "MAC elite Primer",
    brand: "MAC",
    sku: "MAc_2838",
    ean: "232424",
    price: "5400",
    caNumber: "0JKDN9",
    quantityToPack: "2",
    size: "No size",
    colour: "Transculent",
  },
  // Add more items as needed
];

interface IParcelTypeWeights {
  small: { min: number; max: number };
  medium: { min: number; max: number };
  large: { min: number; max: number };
}

const ParcelTypeWeights: IParcelTypeWeights = {
  small: { min: 0.1, max: 4 },
  medium: { min: 5, max: 9.9 },
  large: { min: 10, max: 20 },
};

const ConsignmentModal: React.FC = () => {
  const [selectedParcelType, setSelectedParcelType] =
    useState<keyof IParcelTypeWeights>("small");
  const [packWeight, setPackWeight] = useState("");

  const handleParcelTypeChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setSelectedParcelType(event.target.value as keyof IParcelTypeWeights);
    setPackWeight(""); // Reset pack weight on type change
  };

  const handlePackWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPackWeight(event.target.value);
  };

  const handleHandover = () => {
    // Logic for handover button click
    console.log("Handover clicked");
  };

  const handleSubmit = () => {
    // Logic for submit button click
    console.log("Submit clicked");
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          padding: "1rem",
          width: "95%",
          height: "90vh",
          background: "#fff",
          borderRadius: "8px",
          position: "relative",
          overflow: "auto",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <img
                  src="/path/to/image.jpg"
                  alt="Item Image"
                  style={{ width: 200, height: 200 }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <TableContainer component={Card}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Product Name</TableCell>
                    <TableCell>Brand</TableCell>
                    <TableCell>Sku</TableCell>
                    <TableCell>EAN</TableCell>
                    <TableCell>Price</TableCell>
                    <TableCell>CA Number</TableCell>
                    <TableCell>Quantity to Pack</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Colour</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemsInConsignment.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.productName}</TableCell>
                      <TableCell>{item.brand}</TableCell>
                      <TableCell>{item.sku}</TableCell>
                      <TableCell>{item.ean}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.caNumber}</TableCell>
                      <TableCell>{item.quantityToPack}</TableCell>
                      <TableCell>{item.size}</TableCell>
                      <TableCell>{item.colour}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
              justifyContent="flex-end"
            >
              <Grid item>
                <TextField
                  select
                  label="Parcel Type"
                  value={selectedParcelType}
                  onChange={handleParcelTypeChange}
                  variant="outlined"
                  size="small"
                >
                  {Object.keys(ParcelTypeWeights).map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              {selectedParcelType && (
                <Grid item>
                  <TextField
                    label="Pack Weight (kg)"
                    value={packWeight}
                    onChange={handlePackWeightChange}
                    variant="outlined"
                    size="small"
                    type="number"
                    inputProps={{
                      step: "0.1",
                      min: ParcelTypeWeights[selectedParcelType].min as number,
                      max: ParcelTypeWeights[selectedParcelType].max as number,
                    }}
                  />
                </Grid>
              )}
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleHandover}
                >
                  Handover
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ConsignmentModal;
