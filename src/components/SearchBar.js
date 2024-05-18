import React from "react";

const SearchBar = ({ criteria, setCriteria, fetchPlayground }) => {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCriteria((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <button type="submit">Search</button>
    </form>
  );
};

export default SearchBar;
