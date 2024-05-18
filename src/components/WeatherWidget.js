import React, { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Fetch weather data using Open-Meteo API
        const weatherResponse = await axios.get(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation_probability&timezone=auto`
        );
        const weatherData = weatherResponse.data;

        console.log("Weather API response:", weatherData); // Log the overall weather data

        setCurrentWeather(weatherData.current_weather);

        // Extract the precipitation probability for the current hour or nearest hour
        const currentHour = new Date(
          weatherData.current_weather.time
        ).getHours();
        const precipitationProb =
          weatherData.hourly.precipitation_probability[currentHour];
        setPrecipitationProbability(precipitationProb);
      } catch (err) {
        setError("Error fetching weather data");
        console.error("Error fetching weather data:", err);
      }
    };

    fetchWeather();
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

  return (
    <div>
      <p>Temperature: {temperatureFahrenheit.toFixed(1)}°F</p>
      <p>Condition: {weatherCodeDescriptions[weathercode]}</p>
      {precipitationProbability !== null && (
        <p>Precipitation Probability: {precipitationProbability}%</p>
      )}
    </div>
  );
};

export default WeatherWidget;
