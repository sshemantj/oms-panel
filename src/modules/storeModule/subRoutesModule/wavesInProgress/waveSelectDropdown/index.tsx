import React, { useRef, useState } from "react";
import styles from "./waveSelect.module.scss";
import SelectDropdown from "@/component/atoms/selectDropdown";
import { useAppSelector } from "@/store/hooks";
import MultiSelectDropdown from "@/component/molecules/multiSelectDropdown";

interface IProps {
  currValue: string;
  setCurrValue: React.Dispatch<React.SetStateAction<string>>;
}

const WaveSelectDropDown = (props: IProps) => {
  const { currValue, setCurrValue } = props;
  const [selectedNames, setSelectedNames] = useState<string[]>([]);

  return (
    <div className={styles.channel_select_wrapper}>
      <MultiSelectDropdown {...{ selectedNames, setSelectedNames }} />
    </div>
  );
};

export default WaveSelectDropDown;
