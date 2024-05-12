import React, { useState } from "react";
import CounterButtons from "@/component/atoms/counterButtons";
import { Box, Typography } from "@mui/material";

interface IQuantityColumn {
  quantity: number;
  type: "pick" | "additional";
}

const flex = {
  marginTop: "6px",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "1rem",
};

const QuantityColumn = (props: IQuantityColumn) => {
  const { quantity, type } = props;
  const [count, setCount] = useState<number>(0);

  const handleClick = (type: "increment" | "decrement") => {
    if (type === "increment" && quantity > count) setCount((v) => v + 1);
    if (type === "decrement" && count > 0) setCount((v) => v - 1);
  };

  return (
    <Box sx={flex}>
      <CounterButtons {...{ count, handleClick }} />
      {/* {
        type === "pick" ?
      } */}
    </Box>
  );
};

export default QuantityColumn;
