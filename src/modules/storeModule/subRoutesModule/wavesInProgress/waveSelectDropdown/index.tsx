import React from "react";
import MultiSelectDropdown from "@/component/molecules/multiSelectDropdown";
import { TextField } from "@mui/material";
import styles from "./waveSelect.module.scss";

interface IProps {
  selectedNames: string[];
  setSelectedNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const WaveSelectDropDown = (props: IProps) => {
  const { selectedNames, setSelectedNames } = props;
  const options = ["PICK", "PACK", "DISPATCH", "Ref", "SONumber"];

  return (
    <div className={styles.channel_select_wrapper}>
      <MultiSelectDropdown
        {...{
          selectedNames,
          setSelectedNames,
          options,
          label: "Filter",
        }}
      />
      <TextField
        inputProps={{
          sx: {
            padding: "6px",
          },
        }}
        sx={{
          width: "7rem",
          "& fieldset": {
            border: "none !important",
          },
        }}
      />
    </div>
  );
};

export default WaveSelectDropDown;
