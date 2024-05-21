import React, { useState } from "react";
import "./SearchBar.css";

const SearchBar = ({ criteria, setCriteria, fetchPlayground }) => {
  const [zipError, setZipError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "zipcode") {
      if (!/^\d{0,5}$/.test(value)) {
        setZipError("ZIP code must be 5 digits.");
        return;
      } else {
        setZipError("");
      }
    }

    setCriteria((prev) => ({
      ...prev,
      [name]: value === "Any" ? null : value, // if "Any", make the value null
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (criteria.zipcode && criteria.zipcode.length !== 5) {
      setZipError("ZIP code must be exactly 5 digits.");
      return;
    }

    fetchPlayground(criteria);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <p>Select a Borough (or choose "All")</p>
      <select
        name="borough"
        value={criteria.borough || ""}
        onChange={handleInputChange}
      >
        <option value="Any">All</option>
        <option value="Manhattan">Manhattan</option>
        <option value="Brooklyn">Brooklyn</option>
        <option value="Queens">Queens</option>
        <option value="Bronx">Bronx</option>
        <option value="Staten Island">Staten Island</option>
      </select>
      <p>Enter a 5-digit Zip Code</p>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src="/images/Search.svg"
          alt="Search Icon"
          style={{ marginRight: "8px" }}
        />
        <input
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          value={criteria.zipcode || ""}
          onChange={handleInputChange}
        />
      </div>
      {zipError && <p style={{ color: "red" }}>{zipError}</p>}
      <button type="submit">Search by Location</button>
    </form>
  );
};

export default SearchBar;
