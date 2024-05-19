import React from "react";

const PlaygroundCard = ({ playground }) => {
  const { name, displayAddress, imageUrl, boroughName, zipcode } = playground;

  return (
    <div className="playground-card">
      <h2>{name}</h2>
      <img
        src={imageUrl}
        alt={name}
        onError={(e) => {
          e.target.onerror = null; // Prevent infinite loop if placeholder fails
          e.target.src = "https://via.placeholder.com/300";
        }}
        style={{ width: "300px", height: "200px" }}
      />
      <p>{displayAddress}</p>
      <p>
        {boroughName}, NY {zipcode}
      </p>
    </div>
  );
};

export default PlaygroundCard;
