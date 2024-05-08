import { useRouter } from "next/router";
import { IBaseCardProps } from "..";
import styles from "./smallCard.module.scss";

const SmallCardVariant = (props: Omit<IBaseCardProps, "variant">) => {
  const { color = "primary", count, text, path } = props;
  const router = useRouter();

  const handleCardClick = () => {
    router.push(path);
  };

  return (
    <div
      onClick={() => handleCardClick()}
      className={styles.small_variant_card}
    >
      <div className={`${styles.bottomContainer} ${styles[color]}`}></div>
      <div className={styles.topContainer}>
        <div className={styles.titleWrapper}>
          <p className={styles.title}>{text}</p>
        </div>
        <div className={styles.countSection}>
          <h2 className={styles.count}>{count}</h2>
        </div>
      </div>
    </div>
  );
};

export default SmallCardVariant;
