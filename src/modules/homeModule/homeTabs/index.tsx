import CustomTab from "@/component/molecules/customTab";
import { useMobileCheck } from "@/hooks/useMobileCheck";
import { ITabList } from "@/interfaces/home.interface";
import React from "react";

const tabList: { label: string; value: string }[] = [
  { label: "FULFILLMENTS", value: ITabList.FULFILMENTS },
  { label: "STANDARD FULFILLMENTS", value: ITabList.STANDARD_FULFILMENTS },
  { label: "EXPRESS FULFILLMENTS", value: ITabList.EXPRESS_FULFILMENTS },
  { label: "EXCHANGES FULFILLMENTS", value: ITabList.EXCHANGES_FULFILMENTS },
  { label: "Click & Collect", value: ITabList.CLICK_AND_COLLECT },
];

interface IProps {
  currTabValue: ITabList;
  setCurrTabValue: React.Dispatch<React.SetStateAction<ITabList>>;
}

const HomeTabs = (props: IProps) => {
  const { currTabValue, setCurrTabValue } = props;

  const handleChange = (_: any, changedValue: any) => {
    setCurrTabValue(changedValue);
  };

  const isMobile = useMobileCheck();

  return (
    <CustomTab
      type={1}
      value={currTabValue}
      tabList={tabList}
      handleChange={handleChange}
      containerSx={{ width: isMobile ? "280px" : "100%" }}
    />
  );
};

export default HomeTabs;
