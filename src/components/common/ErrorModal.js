import "./ErrorModal.css";

import React from "react";

const ErrorModal = ({ errorMessage, onClose }) => {
  return (
    <div className="error-modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <p>{errorMessage}</p>
      </div>
    </div>
  );
};

export default ErrorModal;
