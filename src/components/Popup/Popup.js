import React from "react";
import "./Popup.css"; // Assuming you have a separate CSS file for the Popup component

const Popup = ({ message, onClose }) => {
  return (
    <div className="popup">
      <div className="popup-content">
        <p>{message}</p>
        <button onClick={onClose}>Dismiss</button>
      </div>
    </div>
  );
};

export default Popup;
