import React, { forwardRef } from "react";
import styles from "./channelSelect.module.scss";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import SelectDropdown from "@/component/atoms/selectDropdown";

interface IProps {
  openSelect: boolean;
  setOpenSelect: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => Promise<void>;
  channelMappingsArr: {
    label: any;
    value: any;
  }[];
  currValue: string;
}

const ChannelSelectDropDown = forwardRef((props: IProps, inputRef) => {
  const {
    channelMappingsArr,
    currValue,
    handleSelectChange,
    openSelect,
    setOpenSelect,
  } = props;
  const isMobile = useMobileCheck();

  return (
    <div className={styles.channel_select_wrapper}>
      <SelectDropdown
        ref={inputRef}
        open={openSelect}
        onClick={(e) => {
          e.stopPropagation();
          setOpenSelect((v) => !v);
        }}
        onMenuClick={() => {
          setOpenSelect((v) => !v);
        }}
        handleOnChange={handleSelectChange}
        label={"Select channel..."}
        data={channelMappingsArr}
        value={currValue}
        selectSx={{
          "& .MuiInputBase-input": {
            padding: "5px",
          },
          "& fieldset legend": {
            display: "none",
          },
          "& label": {
            top: currValue ? 0 : "-12px",
            display: currValue ? "none" : "unset",
          },
          "& .MuiInputLabel-shrink": {
            top: "15px",
          },
        }}
        selectStyles={{
          minWidth: "2rem",
          width: "100%",
        }}
        selectWrapperStyle={{ padding: "0" }}
      />
    </div>
  );
});

ChannelSelectDropDown.displayName = "ChannelSelectDropDown";

export default ChannelSelectDropDown;
