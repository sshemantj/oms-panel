import React from "react";
import CustomSelect from "@/component/atoms/customSelect";
import { Box } from "@mui/material";

const data = [
  { label: "small", value: "small" },
  { label: "medium", value: "medium" },
  { label: "large", value: "large" },
];

const OrderTypeSelect = () => {
  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {};

  return (
    <Box>
      <CustomSelect
        {...{
          data,
          handleOnChange,
          label: "Parcel type",
          selectWrapperStyle: {
            marginTop: "12px",
          },
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
    </Box>
  );
};

export default OrderTypeSelect;
