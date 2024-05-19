import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Main from "../../components/Main/Main";
import Map from "../../components/Map/Map";
import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";

const ParkDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const playground = location.state?.playground;

  console.log("------ Reached Park Details Page ---------");
  console.log("Playground Data in ParkDetails: ", playground);

  if (!playground || !playground.name) {
    return (
      <p>Playground details not available. Please go back and try again.</p>
    );
  }

  const {
    name,
    displayAddress,
    imageUrl,
    parkUrl,
    boroughName,
    zipcode,
    latitude,
    longitude,
    description,
  } = playground;

  const googleMapsLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  return (
    <Main currentPage="ParkDetails">
      <div className="park-details-page">
        <h1>Playground Details</h1>
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

        <h3>Description</h3>
        <p>{description}</p>
        <button onClick={() => (window.location.href = parkUrl)}>
          Go to Parks Website
        </button>

        <h3>Directions</h3>
        <Map latitude={latitude} longitude={longitude} name={name} />
        <p>
          {displayAddress}, {boroughName}, NY {zipcode}
        </p>
        <button onClick={() => window.open(googleMapsLink, "_blank")}>
          Get Directions
        </button>

        <h3>Current Weather</h3>
        <WeatherWidget latitude={latitude} longitude={longitude} />

        <button onClick={() => navigate("/")}>Back to Search</button>
      </div>
    </Main>
  );
};

export default ParkDetails;