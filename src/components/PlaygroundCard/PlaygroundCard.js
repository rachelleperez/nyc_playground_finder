import React from "react";

const PlaygroundCard = ({ playground }) => {
  const { name, displayAddress, imageUrl, boroughName, zipcode } = playground;

  return (
    <div className="playground-card">
      <h2 className="playground-card__title">{name}</h2>
      <img
        className="playground-card__image"
        src={imageUrl}
        alt={name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://via.placeholder.com/300";
        }}
      />
      <p className="playground-card__address">{displayAddress}</p>
      <p className="playground-card__location">
        {boroughName}, NY {zipcode}
      </p>
    </div>
  );
};

export default PlaygroundCard;
