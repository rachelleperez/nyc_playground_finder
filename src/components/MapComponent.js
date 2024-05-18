import React, { useEffect } from "react";
import L from "leaflet";

const MapComponent = ({ latitude, longitude }) => {
  useEffect(() => {
    const map = L.map("map").setView([latitude, longitude], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    L.marker([latitude, longitude])
      .addTo(map)
      .bindPopup("Playground Location")
      .openPopup();

    return () => {
      map.remove();
    };
  }, [latitude, longitude]);

  return <div id="map" style={{ height: "300px", width: "100%" }}></div>;
};

export default MapComponent;
