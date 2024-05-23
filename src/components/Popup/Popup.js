import React, { useEffect } from "react";

const Popup = ({ message, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // remove event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target.className === "popup") {
      onClose();
    }
  };

  return (
    <div className="popup" onClick={handleOverlayClick}>
      <div className="popup__content">
        <img
          src="./images/Cross.svg"
          alt="Close"
          className="popup__close-button"
          onClick={onClose}
        />
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Popup;
