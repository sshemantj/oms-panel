import React from "react";
import SmallCardVariant from "./smallCardVariant";
import MediumCardVariant from "./mediumCardVariant";
import styles from "./cards.module.scss";

export interface IBaseCardProps {
  color?: "success" | "primary" | "warning" | "red";
  variant?: "base" | "sm" | "md" | "lg" | "double";
}

const Cards = (props: IBaseCardProps) => {
  const { variant = "md", ...rest } = props;
  return (
    <div className={styles.card_wrapper}>
      {variant === "sm" ? <SmallCardVariant {...rest} /> : null}
      {variant === "md" ? <MediumCardVariant {...rest} /> : null}
      {/* {variant === "double" ? <DoubleVariantCard {...rest} /> : null} */}
    </div>
  );
};

export default Cards;
