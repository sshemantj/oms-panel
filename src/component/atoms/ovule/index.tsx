import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import styles from "./ovule.module.scss";

interface IProps {
  status: string;
  handleCancel?: (status: string) => void;
}

const Ovule = (props: IProps) => {
  const { status, handleCancel } = props;
  return (
    <div className={styles.ovuleWrapper}>
      <p className={styles.title}>Status :</p>
      <p className={styles.value}>{status}</p>
      <div className={styles.cancelIcon}>
        <CancelIcon onClick={() => handleCancel?.(status)} />
      </div>
    </div>
  );
};

export default Ovule;
