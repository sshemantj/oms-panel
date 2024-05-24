import React from "react";
import ToggleButtons from "@/component/atoms/ToggleButton";
import { SxProps, Theme, Typography } from "@mui/material";

interface IProps {
  currValue: string;
  setCurrValue: React.Dispatch<React.SetStateAction<string>>;
  sx?: SxProps<Theme>;
}

const btnList = [
  {
    element: (
      <Typography fontSize={12} fontWeight={600} variant="subtitle2">
        Two Months
      </Typography>
    ),
    value: "twoMonths",
  },
  {
    element: (
      <Typography fontSize={12} fontWeight={600} variant="subtitle2">
        Three Months
      </Typography>
    ),
    value: "threeMonths",
  },
];

const ToggleMonths = (props: IProps) => {
  const { currValue, setCurrValue, sx } = props;

  return <ToggleButtons {...{ currValue, setCurrValue, btnList, sx }} />;
};

export default ToggleMonths;
