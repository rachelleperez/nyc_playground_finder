import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Main.css";

const Main = ({ children, currentPage }) => {
  return (
    <div className="main">
      <Header currentPage={currentPage} />
      <main className="main__body">{children}</main>
      <Footer />
    </div>
  );
};

export default Main;
