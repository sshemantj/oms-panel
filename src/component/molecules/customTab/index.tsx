import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import { SxProps, Theme } from "@mui/material";

interface IProps {
  buttonList: { label: string; value: string }[];
  value: any;
  setValue?: React.Dispatch<React.SetStateAction<any>>;
  type: 1 | 2;
  handleChange?: (event: React.SyntheticEvent, newValue: string) => void;
  containerSx?: SxProps<Theme>;
}

const CustomTab = (props: IProps) => {
  const {
    buttonList,
    value,
    setValue,
    type,
    handleChange,
    containerSx = {},
  } = props;

  const handleChangeCustom = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setValue?.(newValue);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", ...containerSx }}>
      {type === 1 ? (
        <Tabs
          value={value}
          onChange={handleChange || handleChangeCustom}
          textColor="primary"
          indicatorColor="primary"
          aria-label="secondary tabs example"
        >
          {buttonList.map((item, index) => {
            return <Tab key={index} value={item.value} label={item.label} />;
          })}
        </Tabs>
      ) : null}
      {type === 2 ? <FullWidthTabs {...props} /> : null}
    </Box>
  );
};

export default CustomTab;

function FullWidthTabs(props: IProps) {
  const { buttonList, value, setValue } = props;

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue?.(newValue);
  };

  const a11yProps = (index: number) => {
    return {
      id: `full-width-tab-${index}`,
      "aria-controls": `full-width-tabpanel-${index}`,
    };
  };

  return (
    <Box sx={{ bgcolor: "background.paper", width: 500 }}>
      <AppBar position="static">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {buttonList.map((item, index) => {
            return (
              <Tab
                key={index}
                value={item.value}
                label={item.label}
                {...a11yProps(index)}
              />
            );
          })}
        </Tabs>
      </AppBar>
    </Box>
  );
}
