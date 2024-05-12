import React from "react";
import {
  MenuItem,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from "@mui/material";
import styles from "./customSelect.module.scss";

interface IProps {
  label: string;
  data: {
    label: string;
    value: string | number;
  }[];
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  selectSx?: SxProps<Theme>;
  selectWrapperStyle?: React.CSSProperties;
}

const CustomSelect = (props: IProps & Omit<TextFieldProps, "variant">) => {
  const {
    data,
    label,
    handleOnChange,
    selectSx = {},
    selectWrapperStyle = {},
    ...rest
  } = props;

  return (
    <div style={selectWrapperStyle} className={styles.selectWrapper}>
      <TextField
        className={styles.selectStyles}
        select
        label={label}
        size="medium"
        onChange={handleOnChange}
        sx={selectSx}
        {...rest}
      >
        {data.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </TextField>
    </div>
  );
};

export default CustomSelect;
