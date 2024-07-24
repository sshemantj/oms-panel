import { Box, Chip } from "@mui/material";
import React from "react";

interface ChipListProps {
  chipData: { key: number; label: string }[];
  handleDelete: (chipToDelete: any) => () => void;
}

const ChipList: React.FC<ChipListProps> = ({ chipData, handleDelete }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        padding: 2,
        gap: 1,
      }}
    >
      {chipData.map((data) => {
        return data.label ? (
          <Chip
            sx={{ borderRadius: "8px" }}
            key={data.key}
            label={data.label}
            onDelete={handleDelete(data)}
          />
        ) : null;
      })}
    </Box>
  );
};

export default ChipList;
