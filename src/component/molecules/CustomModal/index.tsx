import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";

interface IProps {
  open: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  handleModalClose?: () => void;
  children: JSX.Element;
  closeIconStyle?: React.CSSProperties;
  showClose?: boolean;
}

const CustomModal = (props: IProps) => {
  const {
    open,
    setOpen = () => {},
    handleModalClose = () => {},
    children,
    closeIconStyle,
    showClose = true,
  } = props;

  const handleClose = () => {
    setOpen(false);
    handleModalClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <>
        {children}
        {showClose && (
          <CloseIcon
            onClick={() => handleClose()}
            style={{
              position: "absolute",
              top: "3rem",
              right: "3.5rem",
              opacity: 0.5,
              cursor: "pointer",
              ...closeIconStyle,
            }}
          />
        )}
      </>
    </Modal>
  );
};

export default CustomModal;
