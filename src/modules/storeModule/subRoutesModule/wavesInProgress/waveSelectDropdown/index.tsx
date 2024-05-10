import React from "react";
import MultiSelectDropdown from "@/component/molecules/multiSelectDropdown";
import styles from "./waveSelect.module.scss";

interface IProps {
  selectedNames: string[];
  setSelectedNames: React.Dispatch<React.SetStateAction<string[]>>;
}

const WaveSelectDropDown = (props: IProps) => {
  const { selectedNames, setSelectedNames } = props;
  const options = ["PICK", "PACK", "DISPATCH"];

  return (
    <div className={styles.channel_select_wrapper}>
      <MultiSelectDropdown
        {...{
          selectedNames,
          setSelectedNames,
          options,
          label: "select statuses",
        }}
      />
    </div>
  );
};

export default WaveSelectDropDown;
