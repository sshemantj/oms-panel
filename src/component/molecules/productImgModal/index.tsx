import React, { Dispatch, SetStateAction } from "react";
import CustomModal from "../CustomModal";
import Image from "next/image";
import { productImgUrl } from "@/images/AllDataIcons";
import CloseIcon from "@mui/icons-material/Close";
import styles from "./productImg.module.scss";

interface IProps {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
}

const ProductImgModal = (props: IProps) => {
  const { openModal, setOpenModal } = props;

  const handleClose = () => {
    setOpenModal(false);
  };

  return (
    <CustomModal showClose={false} open={openModal} setOpen={setOpenModal}>
      <div className={styles.productImgWrapper}>
        <div className={styles.productInner}>
          <CloseIcon
            onClick={() => handleClose()}
            style={{
              position: "absolute",
              top: "1rem",
              right: "1rem",
              opacity: 0.5,
              cursor: "pointer",
            }}
          />
          <div className={styles.productImg}>
            <Image src={productImgUrl} width={300} height={400} alt="product" />
          </div>
          <div className={styles.productDetails}>
            <p className={styles.title}>
              Carolina Herrara Mena Ch Prive Eau De Toilette For Men (201166499)
            </p>
            <div className={styles.subDetails}>
              <div className={styles.price}>
                <p className={styles.title}>Price:</p>
                <p>6100</p>
              </div>
              <div className={styles.noColor}>
                <p className={styles.title}>NoColour:</p>
                <p>(Style)/(Size)</p>
              </div>
              <div className={styles.quantity}>
                <p className={styles.title}>Quantity:</p>
                <p>1</p>
              </div>
              <div className={styles.eanValue}>
                <p className={styles.title}>Ean value:</p>
                <p>201166499</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CustomModal>
  );
};

export default ProductImgModal;
