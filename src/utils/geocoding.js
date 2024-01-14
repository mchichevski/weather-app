// geocoding.js

const { getWeather } = require("./weather");

const API_KEY = ""; // your api_key

async function getGeocoding(city) {
  try {
    const URL = `https://geocode.maps.co/search?q=${city}&api_key=${API_KEY}`;
    const res = await fetch(URL);

    if (!res.ok) {
      const error = new Error(
        `Failed to fetch geocoding data. Status: ${res.status}`
      );
      return { Error: error.message };
    }

    const data = await res.json();

    if (!data || data.length === 0) {
      const error = new Error("No data found for the provided city");
      return { Error: error.message };
    }

    const cityName = data[0].display_name;
    const lat = data[0].lat;
    const lon = data[0].lon;
    const weatherData = await getWeather(lat, lon);

    return {
      forecast: `${weatherData.currentWeather}. It is currently ${weatherData.currentTemp}\u00B0C outside.`,
      location: cityName,
      address: city,
    };
  } catch (error) {
    console.error("Error in getGeocoding:", error.message);
    throw error; // Re-throw the error to propagate it to the calling code
  }
}

module.exports = {
  getGeocoding,
};
