import React from "react";
import styles from "./DeleteTaskModal.module.css";
import deleteIconLarge from "../../../assets/deleteIconLarge.png";
import deleteIcon from "../../../assets/deleteIcon.png";

interface DeleteTaskModalProps {
  taskName: string;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteTaskModal: React.FC<DeleteTaskModalProps> = ({
  taskName,
  onClose,
  onDelete,
}) => {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <img
            src={deleteIconLarge}
            alt="Delete Icon"
            className={styles.icon}
          />
        </div>
        <div className={styles.modalContent}>
          <h2 className={styles.title}>Delete Task!</h2>
          <p className={styles.message}>
            Are you sure that you want to delete <strong>{taskName}</strong>?
          </p>
          <div className={styles.buttonGroup}>
            <button onClick={onClose} className={styles.cancelButton}>
              Cancel
            </button>
            <button onClick={onDelete} className={styles.deleteButton}>
              <img
                src={deleteIcon}
                alt="Delete Icon"
                className={styles.iconSmall}
              />
              <span className={styles.buttonText}>Delete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTaskModal;
