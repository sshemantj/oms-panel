import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import styles from "./rhsWrapper.module.scss";

const RhsWrapper = () => {
  return (
    <div className={styles.rhs_Wrapper}>
      <div className={styles.notificatin_container}>
        <NotificationsNoneIcon color="inherit" />
      </div>
      <div className={styles.profile_container}>
        <PermIdentityIcon color="inherit" />
      </div>
    </div>
  );
};

export default RhsWrapper;
