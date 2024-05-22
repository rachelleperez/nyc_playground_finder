import React, { useState } from "react";
import { Link } from "react-router-dom";
import Main from "../../components/Main/Main";
import PlaygroundCard from "../../components/PlaygroundCard/PlaygroundCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Preloader from "../../components/Preloader/Preloader";
import Popup from "../../components/Popup/Popup";
import "./Home.css";

import { fetchPlayground } from "../../utils/apiNYCOpenData";

const Home = () => {
  console.log("-------- Reached Main Page --------");

  const [criteria, setCriteria] = useState({});
  const [playground, setPlayground] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const closePopup = () => {
    setCriteria({ borough: "Any", zipcode: "" }); // as this criteria is ignored, reset
    setShowPopup(false);
  };

  const handleSurpriseMe = () => {
    setCriteria({ borough: "Any", zipcode: "" }); // as this criteria is ignored, reset
    fetchPlayground(
      { borough: null, zipcode: null },
      setLoading,
      setPlayground,
      setPopupMessage,
      setShowPopup,
      setCriteria
    );
  };

  return (
    <Main currentPage="Home">
      <div className="home-page">
        <h1>NYC Playground Finder</h1>
        <h3 className="subtitle">
          Discover the best playgrounds in New York City.{" "}
        </h3>
        <p>
          Explore a wide variety of playgrounds in New York City. Whether you're
          looking for a specific location or just want to be surprised, this
          tool helps you find the perfect playground for your needs. Get
          real-time weather updates and detailed maps to plan your visit.
        </p>
        <h2>Playground Search</h2>
        <p>Search by location or click "Surprise Me" for any NYC playground.</p>
        <div className="search-filter">
          <SearchBar
            criteria={criteria}
            setCriteria={setCriteria}
            fetchPlayground={(criteria) =>
              fetchPlayground(
                criteria,
                setLoading,
                setPlayground,
                setPopupMessage,
                setShowPopup,
                setCriteria
              )
            }
          />
          <button className="home-page-button" onClick={handleSurpriseMe}>
            Surprise Me
          </button>
        </div>
        {loading && <Preloader />}
        {playground && (
          <div className="search-result">
            <h3>Search Result</h3>
            <PlaygroundCard playground={playground} />
            <Link to={`/details/${playground.objectid}`} state={{ playground }}>
              <button className="home-page-button">Learn More</button>
            </Link>
          </div>
        )}
        {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
      </div>
    </Main>
  );
};

export default Home;
