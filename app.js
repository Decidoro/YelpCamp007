const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const CampGround = require("./models/campground");

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  //useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Database connected");
});

const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/campgrounds", async (req, res) => {
  const campgrounds = await CampGround.find({});
  res.render("./campgrounds/index", { campgrounds }); //structre templates in diffrent folders
});

app.get("/campgrounds/:id", async (req, res) => {
  const campground = await CampGround.findById(req.params.id);
  res.render("./campgrounds/show", { campground });
});

app.listen(5500, () => {
  console.log("Serving on port 5500.");
});
