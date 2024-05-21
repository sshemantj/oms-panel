import React, { useState } from "react";
import Image from "next/image";
import CustomModal from "@/component/molecules/CustomModal";
import { Box, Typography } from "@mui/material";
import shoeImg from "@/images/shoe img.png";
import CloseIcon from "@mui/icons-material/Close";
import FeaturedTable from "@/tables/featuredTable";
import { returnModalColumns, returnModalRows } from "@/constants/tableConstant";

interface IProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const QualityCheckModal = (props: IProps) => {
  const { open, setOpen } = props;

  const [tableState, setTableState] = useState<any>({
    columns: returnModalColumns,
    rows: returnModalRows,
  });

  const handleModalClose = () => {
    setOpen(false);
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
            RMA #: 17121000
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Image src={shoeImg} width={200} height={200} alt="product" />
          </Box>
          <Box>
            <FeaturedTable
              {...{
                rows: tableState.rows,
                columns: tableState.columns,
                tableStyleWrapper: {
                  height: "auto",
                },
                hideFooter: true,
              }}
            />
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
