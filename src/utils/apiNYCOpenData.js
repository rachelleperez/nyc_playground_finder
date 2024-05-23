import axios from "axios";
import cheerio from "cheerio";
import {
  boroughNames,
  baseURIs,
  popupMessages,
  boroughOptions,
} from "../utils/constants";

export const fetchPlayground = async (
  criteria,
  setLoading,
  setPlayground,
  setPopupMessage,
  setShowPopup,
  setCriteria
) => {
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

    console.log(`API Call: ${url}`);

    fetch(url)
      .then((response) => response.json())
      .then(async (data) => {
        if (Array.isArray(data) && data.length > 0) {
          const randomPlayground =
            data[Math.floor(Math.random() * data.length)];

          console.log("Playground Data from NYC Parks API: ", randomPlayground);

          const mappedPlayground = await scrapePlaygroundDetails(
            randomPlayground
          );

          setPlayground(mappedPlayground);
          console.log("Playground Data in Home: ", mappedPlayground);
        } else {
          if (criteria.borough && criteria.zipcode) {
            setPopupMessage(popupMessages.noResultsCombination);
          } else if (criteria.zipcode) {
            setPopupMessage(popupMessages.noResultsZipcode);
          }
          setShowPopup(true);
          setCriteria({ borough: "Any", zipcode: "" });
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching playground data:", error);
        setPopupMessage("An error occurred while fetching playground data.");
        setShowPopup(true);
        setCriteria({ borough: "Any", zipcode: "" });
        setLoading(false);
      });
  } catch (error) {
    console.error("Error fetching playground data:", error);
    setPopupMessage("An error occurred while fetching playground data.");
    setShowPopup(true);
    setCriteria({ borough: "Any", zipcode: "" });
    setLoading(false);
  }
};

const scrapePlaygroundDetails = async (playground) => {
  try {
    const htmlResponse = await axios.get(
      `https://api.allorigins.win/get?url=${encodeURIComponent(playground.url)}`
    );
    if (htmlResponse.data && htmlResponse.data.contents) {
      const html = htmlResponse.data.contents;
      const $ = cheerio.load(html);

      const imageUrl = $(".featured_src").attr("src");
      const description = $("#park_description p").first().text();

      const coordinates = playground.multipolygon.coordinates[0][0];
      const [lon, lat] = coordinates[0];

      return {
        name: playground.name311,
        displayAddress: playground.address || playground.location,
        imageUrl: imageUrl || "https://via.placeholder.com/300",
        parkUrl: playground.url || "https://www.nycgovparks.org/parks/",
        description:
          description ||
          "Click the link below to the NYC Parks website to learn more.",
        boroughName: boroughNames[playground.borough],
        zipcode: playground.zipcode,
        objectid: playground.objectid,
        latitude: lat,
        longitude: lon,
      };
    } else {
      throw new Error("Failed to fetch HTML content from AllOrigins");
    }
  } catch (error) {
    console.error("Error scraping playground details:", error);
    throw error;
  }
};

const getRandomBorough = () => {
  const boroughKeys = Object.keys(boroughOptions).filter(
    (key) => key !== "Any"
  );
  const randomKey = boroughKeys[Math.floor(Math.random() * boroughKeys.length)];
  return boroughOptions[randomKey];
};
