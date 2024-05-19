import React from "react";
import Navigation from "../Navigation/Navigation";

const Header = ({ currentPage }) => {
  return (
    <header>
      <p>NYC Playground Finder</p>
      <Navigation currentPage={currentPage} />
    </header>
  );
};

export default Header;
