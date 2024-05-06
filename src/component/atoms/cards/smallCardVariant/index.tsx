import { IBaseCardProps } from "..";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import styles from "./smallCard.module.scss";

const SmallCardVariant = (props: Omit<IBaseCardProps, "variant">) => {
  const { color = "primary" } = props;
  return (
    <div className={styles.small_variant_card}>
      <div className={styles.topContainer}>
        <div className={styles.text_section}>
          <h2 className={styles.count}>$30200</h2>
          <p className={styles.subtitle}>All earnings.</p>
        </div>
        <div className={styles.icon_wrapper}>
          <StackedBarChartIcon color="inherit" style={{ fontSize: "3rem" }} />
        </div>
      </div>
      <div className={`${styles.bottomContainer} ${styles[color]}`}>
        <p>% change</p>
        <TrendingUpIcon />
      </div>
    </div>
  );
};

export default SmallCardVariant;
