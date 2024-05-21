import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./Main.css";

const Main = ({ children, currentPage }) => {
  return (
    <div className="main-layout">
      <Header currentPage={currentPage} />
      <main className="main">{children}</main>
      <Footer />
    </div>
  );
};

export default Main;
