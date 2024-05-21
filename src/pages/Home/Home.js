import React, { useState } from "react";
import { Link } from "react-router-dom";
import Main from "../../components/Main/Main";
import PlaygroundCard from "../../components/PlaygroundCard/PlaygroundCard";
import SearchBar from "../../components/SearchBar/SearchBar";
import Preloader from "../../components/Preloader/Preloader";
import Popup from "../../components/Popup/Popup";
import "./Home.css";

import {
  boroughNames,
  boroughOptions,
  baseURIs,
  popupMessages,
} from "../../utils/constants";
import axios from "axios";
import cheerio from "cheerio";

const Home = () => {
  console.log("-------- Reached Main Page --------");

  const [criteria, setCriteria] = useState({});
  const [playground, setPlayground] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const fetchPlayground = async (criteria) => {
    setLoading(true);
    try {
      let url;
      if (criteria.borough && criteria.zipcode) {
        url = `${baseURIs.nycParks}?borough=${criteria.borough}&zipcode=${criteria.zipcode}&typecategory=Playground`;
      } else if (!criteria.borough && criteria.zipcode) {
        url = `${baseURIs.nycParks}?zipcode=${criteria.zipcode}&typecategory=Playground`;
      } else {
        let borough = criteria.borough || getRandomBorough();
        url = `${baseURIs.nycParks}?borough=${borough}&typecategory=Playground`;
      }

      console.log(`API Call: ${url}`); // Log the API call
      const response = await fetch(url);
      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const randomPlayground = data[Math.floor(Math.random() * data.length)];
        const playgroundBorough = randomPlayground.borough;

        console.log("Playground Data from NYC Parks API: ", randomPlayground); // Log only the selected playground data

        // Use AllOrigins to fetch the HTML
        const htmlResponse = await axios.get(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            randomPlayground.url
          )}`
        );
        if (htmlResponse.data && htmlResponse.data.contents) {
          const html = htmlResponse.data.contents;
          const $ = cheerio.load(html);

          // Extract the image
          const imageUrl = $(".featured_src").attr("src");
          // console.log(`Fetched Image URL: ${imageUrl}`);

          // Extract the description
          const description = $("#park_description p").first().text();
          // console.log(`Fetched Description: ${description}`);

          const coordinates = randomPlayground.multipolygon.coordinates[0][0];
          const [lon, lat] = coordinates[0];

          const mappedPlayground = {
            name: randomPlayground.name311,
            displayAddress:
              randomPlayground.address || randomPlayground.location,
            imageUrl: imageUrl || "https://via.placeholder.com/300", // TODO: consider an 'image' placeholder based on the playground slide emoji
            parkUrl:
              randomPlayground.url || "https://www.nycgovparks.org/parks/",
            description:
              description ||
              "Click the link below to the NYC Parks website to learn more.",
            boroughName: boroughNames[playgroundBorough],
            zipcode: randomPlayground.zipcode,
            objectid: randomPlayground.objectid,
            latitude: lat,
            longitude: lon,
          };

          setPlayground(mappedPlayground);
          console.log("Playground Data in Home: ", mappedPlayground); // Log the mapped playground data
        } else {
          throw new Error("Failed to fetch HTML content from AllOrigins");
        }
      } else {
        if (criteria.borough && criteria.zipcode) {
          setPopupMessage(popupMessages.noResultsCombination);
        } else if (criteria.zipcode) {
          setPopupMessage(popupMessages.noResultsZipcode);
        }
        setShowPopup(true);
        // Update criteria to set Borough to 'Any' and clear zipcode
        setCriteria({ borough: "Any", zipcode: "" });
      }
    } catch (error) {
      console.error("Error fetching playground data:", error);
      setPopupMessage("An error occurred while fetching playground data.");
      setShowPopup(true);
      // Update criteria to set Borough to 'Any' and clear zipcode
      setCriteria({ borough: "Any", zipcode: "" });
    }
    setLoading(false);
  };

  const closePopup = () => {
    setCriteria({ borough: "Any", zipcode: "" }); // as this criteria is ignored, reset
    setShowPopup(false);
  };

  const getRandomBorough = () => {
    const boroughKeys = Object.keys(boroughOptions).filter(
      (key) => key !== "Any"
    );
    const randomKey =
      boroughKeys[Math.floor(Math.random() * boroughKeys.length)];
    return boroughOptions[randomKey];
  };

  const handleSurpriseMe = () => {
    setCriteria({ borough: "Any", zipcode: "" }); // as this criteria is ignored, reset
    fetchPlayground({ borough: null, zipcode: null });
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
            fetchPlayground={fetchPlayground}
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
