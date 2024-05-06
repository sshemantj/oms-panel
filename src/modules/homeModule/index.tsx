import React, { useRef, useState } from "react";
import { Grid } from "@mui/material";
import Cards, { IBaseCardProps } from "@/component/atoms/cards";
import ChannelSelectDropDown from "@/component/molecules/channelSelectDropdown";
import { useAppSelector } from "@/store/hooks";

const cardsList: IBaseCardProps[] = [
  {
    text: "oreders awaiting pick",
    count: 10,
    color: "warning",
  },
  {
    text: "waves in progress",
    count: 10,
    color: "red",
  },
  {
    text: "completed waves",
    count: 10,
    color: "warning",
  },
];

const HomeModule = () => {
  const [currValue, setCurrValue] = useState("");
  const [openSelect, setOpenSelect] = useState<boolean>(false);
  const inputRef = useRef<any>(null);

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

  const handleSelectChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { value } = e.target;
    setCurrValue(value);
  };

  return (
    <Grid container spacing={2} padding={"0 1rem"}>
      <Grid sm={12} md={12} mt={3} item style={{ padding: 0 }}>
        <Grid container spacing={2} mt={1}>
          {cardsList.map(({ text, count, color }) => {
            return (
              <Grid item md={4}>
                <Cards {...{ count, text, color }} variant="sm" />
              </Grid>
            );
          })}
        </Grid>
        <Grid container mt={3}>
          <Grid style={{ margin: "0 0 0 auto", padding: "0" }} item md={2}>
            <ChannelSelectDropDown
              {...{
                ref: inputRef,
                channelMappingsArr,
                currValue,
                handleSelectChange,
                openSelect,
                setOpenSelect,
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      {/* <h1>home</h1> */}
    </Grid>
  );
};

export default HomeModule;
