import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlaygroundCard from "../components/PlaygroundCard";
import SearchBar from "../components/SearchBar";
import Preloader from "../components/Preloader";
import Popup from "../components/Popup";
import {
  boroughNames,
  boroughOptions,
  baseURIs,
  popupMessages,
} from "../utils/constants";
import axios from "axios";
import cheerio from "cheerio";

const MainPage = () => {
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

        console.log(randomPlayground); // Log only the selected playground data

        // Use AllOrigins to fetch the HTML
        const htmlResponse = await axios.get(
          `https://api.allorigins.win/get?url=${encodeURIComponent(
            randomPlayground.url
          )}`
        );
        if (htmlResponse.data && htmlResponse.data.contents) {
          const html = htmlResponse.data.contents;
          const $ = cheerio.load(html);
          const imageUrl = $(".featured_src").attr("src");
          console.log(`Fetched Image URL: ${imageUrl}`); // Log the fetched image URL

          const coordinates = randomPlayground.multipolygon.coordinates[0][0];
          const [lon, lat] = coordinates[0];

          const mappedPlayground = {
            name: randomPlayground.name311,
            displayAddress:
              randomPlayground.address || randomPlayground.location,
            imageUrl: imageUrl || "https://via.placeholder.com/300",
            boroughName: boroughNames[playgroundBorough],
            zipcode: randomPlayground.zipcode,
            objectid: randomPlayground.objectid,
            latitude: lat,
            longitude: lon,
          };

          setPlayground(mappedPlayground);
          console.log("Playground Data in MainPage: ", mappedPlayground); // Log the mapped playground data
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
      }
    } catch (error) {
      console.error("Error fetching playground data:", error);
      setPopupMessage("An error occurred while fetching playground data.");
      setShowPopup(true);
    }
    setLoading(false);
  };

  const closePopup = () => {
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

  return (
    <div className="main-page">
      <h1>NYC Playground Finder</h1>
      <SearchBar setCriteria={setCriteria} fetchPlayground={fetchPlayground} />
      {loading && <Preloader />}
      {playground && (
        <div>
          <PlaygroundCard playground={playground} />
          <button onClick={() => fetchPlayground(criteria)}>Try Again</button>
          <Link to={`/details/${playground.objectid}`} state={{ playground }}>
            <button>Learn More</button>
          </Link>
        </div>
      )}
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
    </div>
  );
};

export default MainPage;
