import { Box, Grid, Typography } from "@mui/material";
import React from "react";

interface IProps {
  listObj: Object;
  title?: string;
  keyColumn?: number;
  valueColumn?: number;
}

const ReturnIdSection = (props: IProps) => {
  const { title, listObj = {}, keyColumn = 6, valueColumn = 6 } = props;
  return (
    <Box
      minHeight={400}
      bgcolor="#fff"
      padding={title ? "12px 0" : "0 0 12px 0"}
    >
      {title && (
        <Box padding="0 16px 16px 16px" borderBottom="1px solid lightgrey">
          <Typography fontWeight={600} variant="subtitle1">
            {title}
          </Typography>
        </Box>
      )}
      <Box padding="1rem 0 0 1rem">
        {Object.keys(listObj).map((key) => {
          return (
            <Grid key={key} container padding="4px 0">
              <Grid sm={keyColumn} item>
                <Typography color="grey" fontWeight={400} variant="subtitle1">
                  {key}
                </Typography>
              </Grid>
              <Grid sm={valueColumn} item>
                <Typography variant="subtitle1">
                  {/*@ts-ignore*/}
                  {listObj[key]}
                </Typography>
              </Grid>
            </Grid>
          );
        })}
      </Box>
    </Box>
  );
};

export default ReturnIdSection;
