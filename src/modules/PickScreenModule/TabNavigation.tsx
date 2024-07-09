import { AppBar, Tab, Tabs } from "@mui/material";
import React from "react";

interface TabNavigationProps {
  value: number;
  onChange: (event: React.SyntheticEvent, newValue: number) => void;
  statuses: string[];
  tabColors: string[];
}

const TabNavigation: React.FC<TabNavigationProps> = ({
  value,
  onChange,
  statuses,
  tabColors,
}) => {
  return (
    <AppBar position="static" color="default">
      <Tabs
        value={value}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="auto"
        TabIndicatorProps={{ hidden: true }}
        sx={{
          paddingY: 2,
          backgroundColor: "#f5f5f5",
          borderRadius: 2,
          "& .MuiTabs-scrollableX": {
            overflowX: "auto",
          },
        }}
      >
        {statuses.map((status, index) => (
          <Tab
            label={status}
            key={index}
            sx={{
              backgroundColor: tabColors[index],
              color: "#fff",
              borderRadius: 2,
              margin: "0 8px",
              padding: "8px 16px",
              "&:not(:last-child)": {
                marginRight: "8px",
              },
              "&.Mui-selected": {
                backgroundColor: tabColors[index],
                color: "#000",
                border: 2.5,
                borderColor: "000",
              },
            }}
          />
        ))}
      </Tabs>
    </AppBar>
  );
};

export default TabNavigation;
