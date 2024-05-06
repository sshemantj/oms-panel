// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import styles from "./rhsWrapper.module.scss";

const RhsWrapper = () => {
  return (
    <div className={styles.rhs_Wrapper}>
      <div className={styles.notificatin_container}>
        <p>Location: SHOPPERS STOP LTD BHIWANDI {`(${"901"})`}</p>
      </div>
      {/* <div className={styles.profile_container}></div> */}
    </div>
  );
};

export default RhsWrapper;
