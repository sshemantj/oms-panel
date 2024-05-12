import React, { useState } from "react";
import CustomSelect from "@/component/atoms/customSelect";
import { Box } from "@mui/material";
import NumberInputBasic from "@/component/atoms/numberRangeInput";

const data = [
  { label: "small", value: "small" },
  { label: "medium", value: "medium" },
  { label: "large", value: "large" },
];

const OrderTypeSelect = () => {
  const [value, setValue] = useState<number | null>(0);

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <CustomSelect
        {...{
          data,
          handleOnChange,
          label: "Parcel type",
          selectSx: {
            width: "170px",
            "& .MuiSelect-outlined": {
              padding: "6px",
            },
            "& .MuiInputLabel-shrink": {
              top: "0px",
            },
            "& label": {
              top: "-10px",
            },
            "& .Mui-focused": {
              top: "0",
            },
          },
        }}
      />
      <NumberInputBasic {...{ value, setValue }} />
    </Box>
  );
};

export default OrderTypeSelect;
