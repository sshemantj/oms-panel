import React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface IProps {
  handleClick: (type: "increment" | "decrement") => void;
  count: number;
}

const CounterButtons = (props: IProps) => {
  const { handleClick, count } = props;

  return (
    <ButtonGroup variant="outlined" aria-label="Basic button group">
      <Button onClick={() => handleClick("decrement")}>
        <RemoveIcon />
      </Button>
      <Button>{count}</Button>
      <Button onClick={() => handleClick("increment")}>
        <AddIcon />
      </Button>
    </ButtonGroup>
  );
};

export default CounterButtons;
