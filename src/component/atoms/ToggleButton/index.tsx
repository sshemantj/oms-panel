import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { SxProps, Theme } from "@mui/material";

interface IProps {
  currValue: string;
  setCurrValue: React.Dispatch<React.SetStateAction<string>>;
  btnList: { element: string | JSX.Element; value: string }[];
  sx?: SxProps<Theme>;
}

const ToggleButtons = (props: IProps) => {
  const { currValue, setCurrValue, btnList, sx } = props;

  const handleAlignment = (
    _: React.MouseEvent<HTMLElement>,
    months: string
  ) => {
    setCurrValue(months);
  };

  return (
    <ToggleButtonGroup
      sx={sx}
      value={currValue}
      exclusive
      onChange={handleAlignment}
      aria-label="text currValue"
    >
      {btnList.map(({ element, value }, index) => {
        return (
          <ToggleButton key={index} value={value} aria-label="left aligned">
            {element}
          </ToggleButton>
        );
      })}
    </ToggleButtonGroup>
  );
};

export default ToggleButtons;
