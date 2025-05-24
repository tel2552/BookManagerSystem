import React from 'react';
import styles from '../styles/ConfirmDialog.module.css'; // Import CSS Module

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel,
  confirmButtonText = 'Confirm',
  cancelButtonText = 'Cancel',
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    // The backdrop now also centers the dialog using flexbox
    <div className={styles.backdrop} onClick={onCancel}>
      {/* Stop propagation to prevent backdrop click when clicking inside dialog */}
      <div className={styles.dialog} onClick={(e) => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className={styles.buttonContainer}>
          <button onClick={onCancel} className={`${styles.button} ${styles.cancelButton}`}>
            {cancelButtonText}
          </button>
          <button onClick={onConfirm} className={`${styles.button} ${styles.confirmButton}`}>
            {confirmButtonText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;