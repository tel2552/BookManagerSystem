import React from 'react';

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

  // Basic styling for the dialog - you'll likely want to improve this with CSS or a UI library
  const dialogStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    zIndex: 1000, // Ensure it's above other content
    border: '1px solid #ccc',
  };

  const backdropStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999, // Below the dialog but above other content
  };

  return (
    <>
      <div style={backdropStyle} onClick={onCancel} />
      <div style={dialogStyle}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div style={{ marginTop: '20px', textAlign: 'right' }}>
          <button onClick={onCancel} style={{ marginRight: '10px' }}>{cancelButtonText}</button>
          <button onClick={onConfirm} style={{ backgroundColor: '#007bff', color: 'white' }}>{confirmButtonText}</button>
        </div>
      </div>
    </>
  );
};

export default ConfirmDialog;