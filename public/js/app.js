console.log("Client side JavaScript is running...");

const fetchData = async (location) => {
  if (location === "") {
    console.log("You must enter an address...");
    return {
      error: "You must enter an address...",
    };
  } else {
    const res = await fetch(
      `http://localhost:3000/weather?address=${location}`
    );
    const data = await res.json();
    if (data.Error) {
      console.log(data.Error);
      return {
        error: data.Error,
      };
    } else {
      console.log(data.forecast);
      console.log(data.location);
      return {
        forecast: data.forecast,
        location: data.location,
      };
    }
  }
};

const form = document.querySelector("form");
const input = document.querySelector("input");
let forecastP = document.querySelector(".forecast");
let locationP = document.querySelector(".location");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  forecastP.textContent = "";
  locationP.textContent = "";

  forecastP.textContent = "Loading...";
  const location = input.value;
  console.log(location);

  const weatherData = await fetchData(location);
  if (weatherData.error) {
    forecastP.textContent = weatherData.error;
  } else {
    forecastP.textContent = weatherData.forecast;
    locationP.textContent = weatherData.location;
  }
  input.value = "";
});
