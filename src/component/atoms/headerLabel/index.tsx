import React from "react";
import Breadcrumbs from "../breadcrumb";
import styles from "./headerLabel.module.scss";

const HeaderLabel = () => {
  return (
    <div className={styles.headerLabel_wrapper}>
      <Breadcrumbs />
    </div>
  );
};

export default HeaderLabel;
