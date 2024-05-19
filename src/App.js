import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import ParkDetails from "./pages/ParkDetails/ParkDetails";
import About from "./pages/About/About";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details/:id" element={<ParkDetails />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
};

export default App;
