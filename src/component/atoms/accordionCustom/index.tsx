import React, { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SxProps, Theme } from "@mui/material";

interface IProps {
  summaryJsx: JSX.Element;
  detailsJsx: JSX.Element;
  summarySx?: SxProps<Theme>;
  style?: React.CSSProperties;
}

const AccordionCustom = (props: IProps) => {
  const { summaryJsx, detailsJsx, summarySx = {}, style = {} } = props;
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div style={{ width: "100%", ...style }}>
      <Accordion sx={{ boxShadow: "none" }}>
        <AccordionSummary
          onClick={() => setOpen((prev) => !prev)}
          sx={{
            "& .MuiAccordionSummary-content": {
              margin: "0",
              ...(summarySx as React.CSSProperties),
            },
          }}
        >
          <ExpandMoreIcon
            sx={{
              position: "absolute",
              top: "1.8rem",
              right: "2.5rem",
              transform: `rotate(${open ? "180deg" : "0deg"})`,
            }}
          />
          {summaryJsx}
        </AccordionSummary>
        <AccordionDetails>{detailsJsx}</AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionCustom;
