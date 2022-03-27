import classes from "./Modal.module.css";

type ModalProps = {
  onClose: () => void;
  children: React.ReactNode;
};

const Modal = (props: ModalProps) => {
  return (
    <div className={classes.overlay} onClick={props.onClose}>
      <div className={classes.modalContent}>{props.children}</div>
    </div>
  );
};

export default Modal;
