import React, { useState } from "react";
import FeaturedTable from "@/tables/featuredTable";
import { inProgressRows, inProgressColumns } from "@/constants/tableConstant";
import { Box } from "@mui/material";
import Ovule from "@/component/atoms/ovule";
import WaveSelectDropDown from "./waveSelectDropdown";

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const WavesInProgress = () => {
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  const [tableState, setTableState] = useState({
    columns: inProgressColumns,
    rows: inProgressRows,
  });

  const handleOvuleCancel = (status: string) => {
    setSelectedNames((prev) => prev.filter((v) => v !== status));
  };

  return (
    <Box width={"100%"} mt={2}>
      <Box sx={{ ...flex, justifyContent: "space-between" }}>
        <Box sx={{ ...flex, gap: "0.5rem" }}>
          {selectedNames
            .filter((v) => !["Ref", "SONumber"].includes(v))
            .map((item, index) => {
              return (
                <Ovule
                  handleCancel={handleOvuleCancel}
                  key={index}
                  status={item}
                />
              );
            })}
        </Box>
        <WaveSelectDropDown {...{ selectedNames, setSelectedNames }} />
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
