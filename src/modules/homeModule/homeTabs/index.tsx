import CustomTab from "@/component/molecules/customTab";
import React, { useState } from "react";

const tabList: { label: string; value: string }[] = [
  { label: "FULFILMENTS", value: "fulfilments" },
  { label: "STANDARD FULFILMENTS", value: "standardFulfilments" },
  { label: "EXPRESS FULFILMENTS", value: "expressFulfilments" },
  { label: "EXCHANGES FULFILMENTS", value: "exchangesFulfilments" },
];

const HomeTabs = () => {
  const [currTabValue, setCurrTabValue] = useState<string>("fulfilments");

  const handleChange = (_: any, changedValue: string) => {
    setCurrTabValue(changedValue);
  };

  return (
    <div>
      <CustomTab
        type={1}
        value={currTabValue}
        tabList={tabList}
        handleChange={handleChange}
      />
    </div>
  );
};

export default HomeTabs;
