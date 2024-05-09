import React, { useEffect, useState } from "react";
import {
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Chip,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAppSelector } from "@/store/hooks";

interface IProps {
  selectedNames: string[];
  setSelectedNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const style: React.CSSProperties = {
  height: "100%",
  width: "14rem",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
};

const MultiSelectDropdown = (props: IProps) => {
  const { selectedNames, setSelectedNames } = props;

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value as string[];
    console.log(value);
    if (value[0]) {
      const currValue = value[0];
      if (selectedNames.includes(currValue)) {
        setSelectedNames((v) => {
          return v.filter((item) => item !== currValue);
        });
      } else {
        setSelectedNames((v) => [...v, ...value]);
      }
    }
  };

  return (
    <div style={style}>
      <FormControl sx={{ m: 1, width: "100%" }}>
        <InputLabel
          sx={{
            top: "-10px",
          }}
        >
          Select statuses
        </InputLabel>
        <Select
          multiple
          value={[]}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          input={<OutlinedInput label="Select statuses" />}
          renderValue={(selected) => {
            console.log(selected);
            return (
              <Stack gap={1} direction="row" flexWrap="wrap">
                <p color="black">{selected.length} channels selected</p>
              </Stack>
            );
          }}
          inputProps={{
            sx: {
              padding: "6px",
            },
          }}
        >
          {["PICK", "PACK"]?.map((item: any) => (
            <MenuItem
              key={item}
              value={item}
              sx={{ justifyContent: "space-between" }}
            >
              {item}
              {selectedNames.includes(item) ? <CheckIcon /> : null}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MultiSelectDropdown;
