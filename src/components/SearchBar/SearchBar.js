import React, { useState, useEffect } from "react";
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
      [name]: value === "Any" ? null : value,
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") {
        handleSubmit(e);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // remove the event listener
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [criteria]);

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <p className="search-bar__label">Select a Borough (or choose "All")</p>
      <select
        name="borough"
        value={criteria.borough || ""}
        onChange={handleInputChange}
        className="search-bar__select"
      >
        <option value="Any">All</option>
        <option value="Manhattan">Manhattan</option>
        <option value="Brooklyn">Brooklyn</option>
        <option value="Queens">Queens</option>
        <option value="Bronx">Bronx</option>
        <option value="Staten Island">Staten Island</option>
      </select>
      <p className="search-bar__label">Enter a 5-digit Zip Code</p>
      <div className="search-bar__input-wrapper">
        <img
          src="/images/Search.svg"
          alt="Search Icon"
          className="search-bar__icon"
        />
        <input
          type="text"
          name="zipcode"
          placeholder="Zipcode"
          value={criteria.zipcode || ""}
          onChange={handleInputChange}
          className="search-bar__input"
        />
      </div>
      {zipError && <p className="search-bar__error">{zipError}</p>}
      <button type="submit" className="search-bar__button">
        Search by Location
      </button>
    </form>
  );
};

export default SearchBar;
