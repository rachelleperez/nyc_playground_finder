import React, { useState } from "react";

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
      [name]: value,
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
    <form onSubmit={handleSubmit}>
      <select
        name="borough"
        value={criteria.borough || ""}
        onChange={handleInputChange}
      >
        <option value="Any">Any Borough</option>
        <option value="Manhattan">Manhattan</option>
        <option value="Brooklyn">Brooklyn</option>
        <option value="Queens">Queens</option>
        <option value="Bronx">Bronx</option>
        <option value="Staten Island">Staten Island</option>
      </select>
      <input
        type="text"
        name="zipcode"
        placeholder="Zipcode"
        value={criteria.zipcode || ""}
        onChange={handleInputChange}
      />
      {zipError && <p style={{ color: "red" }}>{zipError}</p>}
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
