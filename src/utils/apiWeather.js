import axios from "axios";

export const fetchWeather = async (
  latitude,
  longitude,
  setCurrentWeather,
  setPrecipitationProbability,
  setError
) => {
  try {
    // Fetch weather data using Open-Meteo API
    const weatherResponse = await axios.get(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation_probability&timezone=auto`
    );
    const weatherData = weatherResponse.data;

    console.log("Weather API response:", weatherData); // Log the overall weather data

    setCurrentWeather(weatherData.current_weather);

    // Extract the precipitation probability for the current hour or nearest hour
    const currentHour = new Date(weatherData.current_weather.time).getHours();
    const precipitationProb =
      weatherData.hourly.precipitation_probability[currentHour];
    setPrecipitationProbability(precipitationProb);
  } catch (err) {
    setError("Error fetching weather data");
    console.error("Error fetching weather data:", err);
  }
};
