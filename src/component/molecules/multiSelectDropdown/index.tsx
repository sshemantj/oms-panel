import React from "react";
import {
  Stack,
  OutlinedInput,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  SelectChangeEvent,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";

interface IProps {
  label: string;
  options: string[];
  selectedNames: string[];
  setSelectedNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const style: React.CSSProperties = {
  height: "100%",
  width: "7rem",
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
};

const MultiSelectDropdown = (props: IProps) => {
  const { selectedNames, setSelectedNames, label, options } = props;

  const handleChange = (e: SelectChangeEvent<string[]>) => {
    const value = e.target.value as string[];
    setSelectedNames(value);
  };

  const handleSelectedText = (selected: string[]) => {
    const isRefExist = selected.includes("Ref");
    const isSONumber = selected.includes("SONumber");

    if (isRefExist && isSONumber) {
      const ind = selected.indexOf("Ref");
      const ind2 = selected.indexOf("SONumber");
      return ind > ind2 ? "Ref" : "SONumber";
    }

    if (isRefExist) {
      return `Ref`;
    }
    if (isSONumber) {
      return `SONumber`;
    }
    return `${selected.length} selected`;
  };

  return (
    <div style={style}>
      <FormControl sx={{ width: "100%" }}>
        <InputLabel
          sx={{
            top: selectedNames.length ? 0 : "-10px",
            borderBottom: !selectedNames.length ? "1px solid blue" : "none",
            color: "gray !important",
            background: "#fff",
          }}
        >
          {label}
        </InputLabel>
        <Select
          multiple
          value={selectedNames}
          onClick={(e) => e.stopPropagation()}
          onChange={handleChange}
          input={<OutlinedInput />}
          sx={{
            "& fieldset": {
              border: "none !important",
            },
          }}
          renderValue={(selected) => {
            return (
              <Stack
                borderBottom="1px solid blue"
                gap={1}
                direction="row"
                flexWrap="wrap"
              >
                <p style={{ fontSize: "0.8rem" }}>
                  {handleSelectedText(selected)}
                </p>
              </Stack>
            );
          }}
          inputProps={{
            sx: {
              padding: "6px",
            },
          }}
        >
          {options?.map((item: any) => (
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
