import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const Main = ({ children, currentPage }) => {
  return (
    <div className="main-layout">
      <Header currentPage={currentPage} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Main;
