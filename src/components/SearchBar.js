import React, { useState } from "react";
import { boroughOptions } from "../utils/constants"; // Import the constants

const getRandomBorough = () => {
  const boroughKeys = Object.keys(boroughOptions).filter(
    (key) => key !== "Any"
  );
  const randomKey = boroughKeys[Math.floor(Math.random() * boroughKeys.length)];
  return boroughOptions[randomKey];
};

const SearchBar = ({ setCriteria, fetchPlayground }) => {
  const [borough, setBorough] = useState("Any");
  const [zipcode, setZipcode] = useState("");
  const [error, setError] = useState("");

  const handleZipcodeChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,5}$/.test(value)) {
      setZipcode(value);
      setError("");
    } else {
      setError("Only enter 5 digits");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (borough === "Any" && !zipcode) {
      const randomBorough = getRandomBorough();
      const newCriteria = { borough: randomBorough, zipcode: "" };
      setCriteria(newCriteria);
      fetchPlayground(newCriteria);
    } else if (borough === "Any" && zipcode) {
      const newCriteria = { borough: "", zipcode };
      setCriteria(newCriteria);
      fetchPlayground(newCriteria);
    } else if (!borough && !zipcode) {
      setError("Please select a borough or enter a zipcode.");
    } else {
      let selectedBorough = boroughOptions[borough];
      const newCriteria = { borough: selectedBorough, zipcode };
      setCriteria(newCriteria);
      fetchPlayground(newCriteria);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Select a borough and/or enter a zipcode:</p>
      <label>
        Borough:
        <select value={borough} onChange={(e) => setBorough(e.target.value)}>
          {Object.keys(boroughOptions).map((borough) => (
            <option key={borough} value={borough}>
              {borough}
            </option>
          ))}
        </select>
      </label>
      <label>
        Zipcode:
        <input
          type="text"
          value={zipcode}
          onChange={handleZipcodeChange}
          maxLength="5"
        />
      </label>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
