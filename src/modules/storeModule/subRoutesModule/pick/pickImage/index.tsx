import { Box } from "@mui/material";
import Image from "next/image";

interface IProps {
  url: string;
}

const PickImage = (props: IProps) => {
  const { url } = props;

  const handleImgClick = () => {};

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
    </Box>
  );
};

export default PickImage;
