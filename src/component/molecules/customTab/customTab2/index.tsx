import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

interface IProps {
  tabList: { label: string; value: string }[];
  value: any;
  handleChange?: (event: React.SyntheticEvent, newValue: string) => void;
}

const CustomTab2 = (props: IProps) => {
  const { tabList, value, handleChange } = props;

  return (
    <Box sx={{ display: "grid", placeItems: "center" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
      >
        {tabList.map((item) => (
          <Tab key={item.label} value={item.value} label={item.label} />
        ))}
      </Tabs>
    </Box>
  );
};

export default CustomTab2;
