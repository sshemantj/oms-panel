import ProductImgModal from "@/component/molecules/productImgModal";
import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";

interface IProps {
  url: string;
}

const PickImage = (props: IProps) => {
  const { url } = props;
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleImgClick = () => {
    setOpenModal(true);
  };

  return (
    <Box>
      <Image
        onClick={() => handleImgClick()}
        style={{ cursor: "pointer" }}
        src={url}
        width={50}
        height={50}
        alt="product"
      />
      <ProductImgModal {...{ openModal, setOpenModal }} />
    </Box>
  );
};

export default PickImage;
