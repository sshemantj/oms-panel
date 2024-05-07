import { IBaseCardProps } from "..";
import styles from "./mediumCard.module.scss";

const MediumCardVariant = (props: Omit<IBaseCardProps, "variant">) => {
  const { color = "primary" } = props;
  return (
    <div className={styles.medium_variant_card}>
      <div className={styles.topContainer}>
        <h2 className={styles.count}>350</h2>
        <p className={styles.subtitle}>Support Requests</p>
        <p className={styles.description}>
          Total number of support requests that come in.
        </p>
      </div>
      <div className={styles.bottomContainer}>
        <div className={`${styles.pannel_wrapper} ${styles[color]}`}>
          <div className={styles.b_panel_parent}>
            <p className={styles.b_panel_number}>10</p>
            <p className={styles.b_panel_text}>Open</p>
          </div>
          <div className={styles.b_panel_parent}>
            <p className={styles.b_panel_number}>5</p>
            <p className={styles.b_panel_text}>Running</p>
          </div>
          <div className={styles.b_panel_parent}>
            <p className={styles.b_panel_number}>3</p>
            <p className={styles.b_panel_text}>Solved</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MediumCardVariant;
