import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ currentPage }) => {
  return (
    <nav className="nav">
      {currentPage === "Home" && (
        <Link className="nav__link" to="/about">
          About
        </Link>
      )}
      {currentPage === "ParkDetails" && (
        <>
          <Link className="nav__link" to="/">
            Home
          </Link>
          <Link className="nav__link" to="/about">
            About
          </Link>
        </>
      )}
      {currentPage === "About" && (
        <Link className="nav__link" to="/">
          Home
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
