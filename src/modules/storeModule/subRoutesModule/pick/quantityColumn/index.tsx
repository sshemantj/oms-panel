import React, { useState } from "react";
import CounterButtons from "@/component/atoms/counterButtons";
import { Box, Typography } from "@mui/material";
import ReasonDropdown from "./reasonDropdown";

interface IQuantityColumn {
  quantity: number;
  type: "pick" | "additional";
}

const flex = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  gap: "1rem",
};

const QuantityColumn = (props: IQuantityColumn) => {
  const { quantity, type } = props;
  const [count, setCount] = useState<number>(0);

  const isPick = type === "pick";
  const isAdditional = type === "additional";

  const handleClick = (type: "increment" | "decrement") => {
    if (isPick) {
      if (type === "increment" && quantity > count) setCount((v) => v + 1);
      if (type === "decrement" && count > 0) setCount((v) => v - 1);
    }
    if (isAdditional) {
      if (type === "increment") setCount((v) => v + 1);
      if (type === "decrement" && count > 0) setCount((v) => v - 1);
    }
  };

  return (
    <Box sx={{ ...flex, marginTop: isPick ? 0 : "6px" }}>
      <CounterButtons
        {...{
          count,
          handleClick,
          disablePlus: quantity <= count,
          disableMinus: count <= 0,
        }}
      />
      {isPick ? <ReasonDropdown /> : null}
    </Box>
  );
};

export default QuantityColumn;
