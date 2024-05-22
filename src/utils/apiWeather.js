export const fetchWeather = async (
  latitude,
  longitude,
  setCurrentWeather,
  setPrecipitationProbability,
  setError
) => {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=precipitation_probability&timezone=auto`;

    fetch(url)
      .then((response) => response.json())
      .then((weatherData) => {
        console.log("Weather API response:", weatherData);

        setCurrentWeather(weatherData.current_weather);

        const currentHour = new Date(
          weatherData.current_weather.time
        ).getHours();
        const precipitationProb =
          weatherData.hourly.precipitation_probability[currentHour];
        setPrecipitationProbability(precipitationProb);
      })
      .catch((err) => {
        setError("Error fetching weather data");
        console.error("Error fetching weather data:", err);
      });
  } catch (err) {
    setError("Error fetching weather data");
    console.error("Error fetching weather data:", err);
  }
};
