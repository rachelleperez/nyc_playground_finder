import React, { useState } from "react";
import { Link } from "react-router-dom";
import PlaygroundCard from "../components/PlaygroundCard";
import SearchBar from "../components/SearchBar";
import Preloader from "../components/Preloader";
import Popup from "../components/Popup";
import Header from "../components/Header";
import Footer from "../components/Footer";
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
          console.log(`Fetched Image URL: ${imageUrl}`);

          // Extract the description
          const description = $("#park_description p").first().text();
          console.log(`Fetched Description: ${description}`);

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
    fetchPlayground({ borough: null, zipcode: null });
    setCriteria({ borough: "Any", zipcode: "" }); // as this criteria is ignored, reset
  };

  return (
    <div className="main-page">
      <Header currentPage="MainPage" />
      <h1>NYC Playground Finder</h1>
      <h2>This is a subtitle</h2>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        scelerisque leo eu semper malesuada.
      </p>
      <h3>Playground Search</h3>
      <p>Search by location or click "Surprise Me" for any NYC playground.</p>
      <SearchBar
        criteria={criteria}
        setCriteria={setCriteria}
        fetchPlayground={fetchPlayground}
      />
      <button onClick={handleSurpriseMe}>Surprise Me</button>
      {loading && <Preloader />}
      {playground && (
        <div>
          <h3>Search Result</h3>
          <PlaygroundCard playground={playground} />
          <button onClick={() => fetchPlayground(criteria)}>Try Again</button>
          <Link to={`/details/${playground.objectid}`} state={{ playground }}>
            <button>Learn More</button>
          </Link>
        </div>
      )}
      {showPopup && <Popup message={popupMessage} onClose={closePopup} />}
      <Footer />
    </div>
  );
};

export default MainPage;
