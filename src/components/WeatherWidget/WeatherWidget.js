import React, { useEffect, useState } from "react";
import { fetchWeather } from "../../utils/apiWeather";

const WeatherWidget = ({ latitude, longitude }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [precipitationProbability, setPrecipitationProbability] =
    useState(null);
  const [error, setError] = useState(null);

  // Weather code descriptions source: https://open-meteo.com/en/docs#hourly=temperature_2m,precipitation_probability&temperature_unit=fahrenheit
  const weatherCodeDescriptions = {
    0: "Clear sky",
    1: "Mainly clear",
    2: "Partly cloudy",
    3: "Overcast",
    45: "Fog",
    48: "Depositing rime fog",
    51: "Drizzle: Light",
    53: "Drizzle: Moderate",
    55: "Drizzle: Dense intensity",
    56: "Freezing Drizzle: Light",
    57: "Freezing Drizzle: Dense",
    61: "Rain: Slight",
    63: "Rain: Moderate",
    65: "Rain: Heavy intensity",
    66: "Freezing Rain: Light",
    67: "Freezing Rain: Heavy",
    71: "Snow fall: Slight",
    73: "Snow fall: Moderate",
    75: "Snow fall: Heavy intensity",
    77: "Snow grains",
    80: "Rain showers: Slight",
    81: "Rain showers: Moderate",
    82: "Rain showers: Violent",
    85: "Snow showers: Slight",
    86: "Snow showers: Heavy",
    95: "Thunderstorm: Slight",
    96: "Thunderstorm: Moderate",
    99: "Thunderstorm with hail",
  };

  const weatherCodeEmojis = {
    0: 127774, // Clear sky ☀️
    1: 127773, // Mainly clear 🌤️
    2: 9925, // Partly cloudy ⛅
    3: 9729, // Overcast ☁️
    45: 127787, // Fog 🌫️
    48: 127787, // Depositing rime fog 🌫️
    51: 127746, // Drizzle: Light 🌦️
    53: 127746, // Drizzle: Moderate 🌦️
    55: 127746, // Drizzle: Dense intensity 🌦️
    56: 127784, // Freezing Drizzle: Light 🌧️
    57: 127784, // Freezing Drizzle: Dense 🌧️
    61: 127783, // Rain: Slight 🌧️
    63: 127783, // Rain: Moderate 🌧️
    65: 127783, // Rain: Heavy intensity 🌧️
    66: 127784, // Freezing Rain: Light 🌧️
    67: 127784, // Freezing Rain: Heavy 🌧️
    71: 127782, // Snow fall: Slight 🌨️
    73: 127782, // Snow fall: Moderate 🌨️
    75: 127782, // Snow fall: Heavy intensity 🌨️
    77: 10052, // Snow grains ❄️
    80: 127781, // Rain showers: Slight 🌧️
    81: 127781, // Rain showers: Moderate 🌧️
    82: 127781, // Rain showers: Violent 🌧️
    85: 127784, // Snow showers: Slight 🌧️
    86: 127784, // Snow showers: Heavy 🌧️
    95: 127785, // Thunderstorm: Slight 🌩️
    96: 127785, // Thunderstorm: Moderate 🌩️
    99: 127785, // Thunderstorm with hail 🌩️
  };

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
