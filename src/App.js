import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ParkDetailsPage from "./pages/ParkDetailsPage";
import About from "./pages/About";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/details/:id" element={<ParkDetailsPage />} />
      <Route path="about" element={<About />} />
    </Routes>
  );
};

export default App;
