// Home.js

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
    setCriteria({ borough: "Any", zipcode: "" });
    setShowPopup(false);
  };

  const handleSurpriseMe = () => {
    setCriteria({ borough: "Any", zipcode: "" });
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
      <div className="home">
        <h1 className="home__title">NYC Playground Finder</h1>
        <h3 className="home__subtitle">
          Discover the best playgrounds in New York City.
        </h3>
        <p className="home__description">
          Explore a wide variety of playgrounds in New York City. Whether you're
          looking for a specific location or just want to be surprised, this
          tool helps you find the perfect playground for your needs. Get
          real-time weather updates and detailed maps to plan your visit.
        </p>
        <h2 className="home__search-title">Playground Search</h2>
        <p className="home__search-description">
          Search by location or click "Surprise Me" for any NYC playground.
        </p>
        <div className="home__search-filter">
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
          <button className="home__button" onClick={handleSurpriseMe}>
            Surprise Me
          </button>
        </div>
        {loading && <Preloader />}
        {playground && (
          <div className="home__search-result">
            <h3 className="home__result-title">Search Result</h3>
            <PlaygroundCard playground={playground} />
            <Link to={`/details/${playground.objectid}`} state={{ playground }}>
              <button className="home__button">Learn More</button>
            </Link>
          </div>
        )}
        {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
      </div>
    </Main>
  );
};

export default Home;
