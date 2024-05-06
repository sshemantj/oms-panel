import React, { forwardRef, useRef } from "react";
import {
  MenuItem,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from "@mui/material";
import styles from "./selectDropdown.module.scss";

interface IProps {
  label: string;
  handleOnChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  selectSx?: SxProps<Theme>;
  selectWrapperStyle?: React.CSSProperties;
  selectStyles?: React.CSSProperties;
  open?: boolean;
  onMenuClick?: () => void;
  data: {
    label: string;
    value: string | number;
  }[];
}

const SelectDropdown = forwardRef(
  (props: IProps & Omit<TextFieldProps, "variant">, inputRef) => {
    const {
      data,
      label,
      handleOnChange,
      selectSx = {},
      selectWrapperStyle = {},
      selectStyles = {},
      open = null,
      onMenuClick,
      ...rest
    } = props;

    return (
      <div style={selectWrapperStyle} className={styles.selectWrapper}>
        <TextField
          {...{ ...(open !== null ? { SelectProps: { open } } : {}) }}
          inputRef={inputRef}
          className={styles.selectStyles}
          style={selectStyles}
          select
          label={label}
          size="medium"
          onChange={handleOnChange}
          sx={selectSx}
          {...rest}
        >
          {data.map(({ label, value }) => (
            <MenuItem
              onClick={(e) => {
                e.stopPropagation();
                onMenuClick?.();
              }}
              key={value}
              value={value}
            >
              {label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    );
  }
);

SelectDropdown.displayName = "SelectDropdown";

export default SelectDropdown;
