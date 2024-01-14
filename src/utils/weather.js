// weather.js

const URL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = ""; // your api_key

const getWeather = async (lat, lon) => {
  const params = {
    lat,
    lon,
    appid: apiKey,
    units: "metric",
  };

  const queryParams = new URLSearchParams(params);
  const fullUrl = `${URL}?${queryParams.toString()}`;

  const res = await fetch(fullUrl);
  const data = await res.json();

  const currentTemp = Math.floor(data.main.temp);
  const currentWeather = data.weather[0].main;

  return { currentTemp, currentWeather };
};

module.exports = {
  getWeather,
};
