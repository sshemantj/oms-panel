import React, { forwardRef } from "react";
import styles from "./channelSelect.module.scss";
import { useMobileCheck } from "@/hooks/useMobileCheck";

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

  return <div className={styles.channel_select_wrapper}></div>;
});

ChannelSelectDropDown.displayName = "ChannelSelectDropDown";

export default ChannelSelectDropDown;
