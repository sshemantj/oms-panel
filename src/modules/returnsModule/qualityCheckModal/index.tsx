import React, { useState } from "react";
import Image from "next/image";
import CustomModal from "@/component/molecules/CustomModal";
import { Box, Button, Typography } from "@mui/material";
import shoeImg from "@/images/shoe img.png";
import CloseIcon from "@mui/icons-material/Close";
import FeaturedTable from "@/tables/featuredTable";
import { returnModalColumns, returnModalRows } from "@/constants/tableConstant";
import { GridRowSelectionModel } from "@mui/x-data-grid";

interface IProps {
  open: boolean;
  rma?: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setRmaId: React.Dispatch<React.SetStateAction<string>>;
}

const QualityCheckModal = (props: IProps) => {
  const { open, setOpen, rma, setRmaId } = props;

  const [selectedTableRows, setSelectedTableRows] =
    useState<GridRowSelectionModel>([]);

  const [tableState, setTableState] = useState<any>({
    columns: returnModalColumns,
    rows: returnModalRows,
  });

  const handleModalClose = () => {
    setOpen(false);
    setRmaId("");
  };

  const onRowSelectionModelChange = (selectedIds: GridRowSelectionModel) => {
    setSelectedTableRows(selectedIds);
  };

  return (
    <CustomModal {...{ open: open, handleModalClose, showClose: false }}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
        <Box height="400px" width="90%" bgcolor="white" position="relative">
          <Typography mt={1} textAlign="center">
            RMA #: {rma}
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image src={shoeImg} width={200} height={200} alt="product" />
          </Box>
          <Box>
            <FeaturedTable
              {...{
                rows: tableState.rows,
                columns: tableState.columns,
                hideFooter: true,
                onRowSelectionModelChange,
                tableStyleWrapper: {
                  height: "auto",
                },
              }}
            />
          </Box>
          <Box
            mt={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap="1rem"
          >
            <Button variant="contained">Update</Button>
            <Button onClick={() => handleModalClose()} variant="outlined">
              Close
            </Button>
          </Box>
          <CloseIcon
            onClick={() => handleModalClose()}
            style={{
              position: "absolute",
              top: "8px",
              right: "1rem",
              opacity: 0.5,
              cursor: "pointer",
            }}
          />
        </Box>
      </Box>
    </CustomModal>
  );
};

export default QualityCheckModal;
