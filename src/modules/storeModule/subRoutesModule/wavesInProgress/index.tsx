import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { inProgressRows, inProgressColumns } from "@/constants/tableConstant";
import { Box } from "@mui/material";
import Ovule from "@/component/atoms/ovule";
import WaveSelectDropDown from "./waveSelectDropdown";

const WavesInProgress = () => {
  const [currValue, setCurrValue] = useState<string>("");

  const [tableState, setTableState] = useState({
    columns: inProgressColumns,
    rows: inProgressRows,
  });

  return (
    <Box width={"100%"} mt={2}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Ovule status={"Pick"} />
        <WaveSelectDropDown {...{ currValue, setCurrValue }} />
      </Box>
      <Box mt={2}>
        <FeaturedTable
          {...{ rows: tableState.rows, columns: tableState.columns }}
        />
      </Box>
    </Box>
  );
};

export default WavesInProgress;
