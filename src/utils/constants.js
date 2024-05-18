export const boroughNames = {
  B: "Brooklyn",
  X: "Bronx",
  M: "Manhattan",
  Q: "Queens",
  R: "Staten Island",
};

export const boroughOptions = {
  Any: "", // Placeholder for random selection
  Brooklyn: "B",
  Bronx: "X",
  Manhattan: "M",
  Queens: "Q",
  "Staten Island": "R",
};

export const baseURIs = {
  nycParks: "https://nycopendata.socrata.com/resource/enfh-gkve.json",
};

export const errors = {
  locationNotFound: "Location not found",
  fetchError: "Error fetching playground data",
};

export const popupMessages = {
  noResultsCombination:
    "No NYC playgrounds found with that borough and zip code combination. Try again.",
  noResultsZipcode: "No NYC playgrounds found with that zip code. Try again.",
  pleaseSelect: "Please select a borough or enter a zipcode.",
};
