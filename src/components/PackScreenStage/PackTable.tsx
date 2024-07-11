import { consigmentColummns } from "@/constants/tableConstant";
import FeaturedTable from "@/tables/featuredTable";
import { Box } from "@mui/material";
import { GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import styles from "./PackScreen.module.scss";

// Define interface for consignment item
interface ConsignmentItem {
  consignmentId: string;
  sku: string;
  productName: string;
  brand: string;
  ean: string;
  quantity: number;
  size: string;
  weight: string;
  color: string;
  imageUrl: string;
}

const PackScreenTable = () => {
  const router = useRouter();
  const [tableState, setTableState] = React.useState<{
    columns: GridColDef[];
    rows: ConsignmentItem[];
  }>({
    columns: consigmentColummns,
    rows: [],
  });
  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

  const onRowSelectionModelChange = (selectedIds: GridRowSelectionModel) => {
    setSelectedTableRows(selectedIds);
    console.log("selectedIds", selectedIds);
    // router.push()
  };
  // Mock consignments data (replace with actual API response handling)
  const consignments: ConsignmentItem[] = [
    {
      consignmentId: "SHIP-001",
      sku: "14054LAVENDER003",
      productName: "Solid Collared Cotton Womens Dress",
      brand: "HANCOCK",
      ean: "14054LAVENDER003",
      quantity: 1,
      size: "LARGE",
      weight: "0",
      color: "LAVENDER",
      imageUrl:
        "https://sslimages.shoppersstop.com/sys-master/images/hbc/h75/29537292910622/A21DO21DEN0903W_WHITE_alt4.jpg_2000Wx3000H",
    },
    {
      consignmentId: "SHIP-002",
      sku: "14054LAVENDER004",
      productName: "Solid Collared Cotton Womens Dress",
      brand: "HANCOCK",
      ean: "14054LAVENDER004",
      quantity: 1,
      size: "LARGE",
      weight: "0",
      color: "LAVENDER",
      imageUrl:
        "https://sslimages.shoppersstop.com/sys-master/images/hbc/h75/29537292910622/A21DO21DEN0903W_WHITE_alt4.jpg_2000Wx3000H",
    },
  ];
  useEffect(() => {
    // Map consignments data to rows
    const rows: ConsignmentItem[] = consignments.map((consignment, index) => ({
      id: index + 1,
      ...consignment,
    }));
    setTableState((prevTableState) => ({ ...prevTableState, rows }));
  }, []);
  console.log("tableState", tableState);
  return (
    <Box className={styles.packScreenWrapper}>
      <Box
        sx={{
          width: "100%",
          marginTop: "1rem",
          padding: "0 1rem 1rem 1rem",
          background: "#fff",
        }}
      >
        <Box mt={2}>
          {tableState.rows && tableState.rows.length ? (
            <FeaturedTable
              {...{
                rows: tableState.rows,
                columns: tableState.columns,
                checkboxSelection: false,
                onRowSelectionModelChange,
              }}
            />
          ) : null}
        </Box>
      </Box>
    </Box>
  );
};

export default PackScreenTable;
