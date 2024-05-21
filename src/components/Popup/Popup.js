import React from "react";
import "./Popup.css";

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <img
          src="/images/Cross.svg"
          alt="Close"
          className="popup-close-button"
          onClick={onClose}
        />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
