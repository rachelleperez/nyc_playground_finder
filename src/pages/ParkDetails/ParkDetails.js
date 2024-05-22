import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Main from "../../components/Main/Main";
import Map from "../../components/Map/Map";
import WeatherWidget from "../../components/WeatherWidget/WeatherWidget";
import "./ParkDetails.css";

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
      <div className="park-details">
        <h1 className="park-details__title">Playground Details</h1>
        <h2 className="park-details__subtitle">{name}</h2>
        <img
          className="park-details__image"
          src={imageUrl}
          alt={name}
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop if placeholder fails
            e.target.src = "https://via.placeholder.com/300";
          }}
        />

        <h3 className="park-details__section-title">Description</h3>
        <p className="park-details__description">{description}</p>
        <button
          className="park-details__button"
          onClick={() => (window.location.href = parkUrl)}
        >
          Go to Parks Website
        </button>

        <h3 className="park-details__section-title">Directions</h3>
        <Map latitude={latitude} longitude={longitude} name={name} />
        <p className="park-details__address">
          {displayAddress}, {boroughName}, NY {zipcode}
        </p>
        <button
          className="park-details__button"
          onClick={() => window.open(googleMapsLink, "_blank")}
        >
          Get Directions
        </button>

        <h3 className="park-details__section-title">Current Weather</h3>
        <WeatherWidget latitude={latitude} longitude={longitude} />

        <button className="park-details__button" onClick={() => navigate("/")}>
          Back to Search
        </button>
      </div>
    </Main>
  );
};

export default ParkDetails;
