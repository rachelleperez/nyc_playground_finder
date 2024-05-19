import React from "react";

const Footer = () => {
  return (
    <footer>
      <p>
        &copy; <span id="current-year">{new Date().getFullYear()}</span>{" "}
        Rachelle Perez. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
