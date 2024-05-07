import React, { forwardRef, useRef, useState } from "react";
import styles from "./channelSelect.module.scss";
import SelectDropdown from "@/component/atoms/selectDropdown";
import { useAppSelector } from "@/store/hooks";

interface IProps {
  currValue: string;
  setCurrValue: React.Dispatch<React.SetStateAction<string>>;
}

const ChannelSelectDropDown = (props: IProps) => {
  const { currValue, setCurrValue } = props;
  const inputRef = useRef<any>(null);
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const { userChannelMappings } = useAppSelector((state) => state.dashboard);

  const channelMappingsArr =
    (Array.isArray(userChannelMappings) &&
      userChannelMappings?.map((item: any) => {
        return {
          label: item.channelName,
          value: item.channelId,
        };
      })) ||
    [];

  const handleChannelSelect = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setCurrValue(value);
  };

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
        handleOnChange={handleChannelSelect}
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
};

export default ChannelSelectDropDown;
