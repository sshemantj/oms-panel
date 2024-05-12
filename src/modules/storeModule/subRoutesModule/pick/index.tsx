import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { pickScreenColumns, pickScreenRows } from "@/constants/tableConstant";
import { Box, Button, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const PickScreen = () => {
  const [tableState, setTableState] = useState({
    columns: pickScreenColumns,
    rows: pickScreenRows,
  });

  return (
    <Box width={"100%"} mt={2}>
      <Box sx={{ ...flex, justifyContent: "space-between" }}>
        <Box sx={{ ...flex, width: "100%", justifyContent: "space-between" }}>
          <Box sx={{ ...flex, gap: "0.5rem" }}>
            <ShoppingBasketIcon style={{ marginTop: "-5px" }} />
            <Typography fontWeight={600}>PICK</Typography>
          </Box>
          <Button variant="contained">DOWNLOAD ITEMS LISTS</Button>
        </Box>
      </Box>
      <Box mt={2}>
        <FeaturedTable
          {...{ rows: tableState.rows, columns: tableState.columns }}
        />
      </Box>
    </Box>
  );
};

export default PickScreen;
