import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage";
import ParkDetailsPage from "./pages/ParkDetailsPage";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/details/:id" element={<ParkDetailsPage />} />
    </Routes>
  );
};

export default App;
