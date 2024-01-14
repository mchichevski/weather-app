const path = require("path");
const express = require("express");
const exp = require("constants");
const app = express();
const hbs = require("hbs");
const { getGeocoding } = require("./utils/geocoding");

// Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsDirPath = path.join(__dirname, "../templates/views");
const partialsDirPath = path.join(__dirname, "../templates/partials");

// Setup static directory to serve
app.use(express.static(publicDirPath));

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    author: "Milan Chichevski",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help page",
  });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About page" });
});

app.get("/weather", async (req, res) => {
  if (!req.query.address) {
    res.send({ error: "Error: No address provided." });
  } else {
    const city = req.query.address;
    const geocodingData = await getGeocoding(city);
    res.send(geocodingData);
  }
});

app.get("*", (req, res) => {
  res.render("404", { errorMsg: "Sorry, page not found..." });
});

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
