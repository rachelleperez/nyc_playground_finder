import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ currentPage }) => {
  return (
    <nav>
      {currentPage === "Home" && <Link to="/about">About</Link>}
      {currentPage === "ParkDetails" && (
        <>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </>
      )}
      {currentPage === "About" && <Link to="/">Home</Link>}
    </nav>
  );
};

export default Navigation;
