import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface IProps {
  handleClick: (type: "increment" | "decrement") => void;
  count: number;
  disablePlus?: boolean;
  disableMinus?: boolean;
}

const CounterButtons = (props: IProps) => {
  const { handleClick, count, disableMinus, disablePlus } = props;

  return (
    <ButtonGroup variant="outlined" aria-label="Basic button group">
      <Button disabled={disableMinus} onClick={() => handleClick("decrement")}>
        <RemoveIcon />
      </Button>
      <Button>{count}</Button>
      <Button disabled={disablePlus} onClick={() => handleClick("increment")}>
        <AddIcon />
      </Button>
    </ButtonGroup>
  );
};

export default CounterButtons;
