import React, { useEffect, useState } from "react";
import { fetchWeather } from "../../utils/apiWeather";
import {
  weatherCodeEmojis,
  weatherCodeDescriptions,
} from "../../utils/constants";

const WeatherWidget = ({ latitude, longitude }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [precipitationProbability, setPrecipitationProbability] =
    useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchWeather(
      latitude,
      longitude,
      setCurrentWeather,
      setPrecipitationProbability,
      setError
    );
  }, [latitude, longitude]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!currentWeather) {
    return <p>Loading weather...</p>;
  }

  const { temperature, weathercode } = currentWeather;

  // Log the specific properties after destructuring
  console.log("Temperature:", temperature);
  console.log("Weather Code:", weathercode);
  console.log("Precipitation Probability:", precipitationProbability);

  // Convert temperature from Celsius to Fahrenheit
  const temperatureFahrenheit = (temperature * 9) / 5 + 32;

  // Get emoji HTML for weather
  const emojiHTML = `&#${weatherCodeEmojis[weathercode]};`;
  console.log(emojiHTML);

  return (
    <div className="weather-widget">
      <p
        className="weather-widget__emoji"
        dangerouslySetInnerHTML={{ __html: emojiHTML }}
      ></p>
      <p className="weather-widget__temp">
        {temperatureFahrenheit.toFixed(1)}°F
      </p>
      <p className="weather-widget__text">
        {weatherCodeDescriptions[weathercode]}
      </p>
      {precipitationProbability !== null && (
        <p className="weather-widget__text">
          {precipitationProbability}% Precipitation
        </p>
      )}
    </div>
  );
};

export default WeatherWidget;
