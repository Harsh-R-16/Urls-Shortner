const express = require("express");
const mongoose = require("mongoose");
const Urls = require("./models/urls");
const app = express();

mongoose.connect("mongodb://localhost:27017/urls", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const urls = await Urls.find();
  res.render("index", { urls });
});

app.post("/urls", async (req, res) => {
  await Urls.create({ full: req.body.url });
  res.redirect("/");
});

app.get("/:url", async (req, res) => {
  try {
    const shortUrl = await Urls.findOne({ short: req.params.url });
    console.log(shortUrl);
    shortUrl.click++;
    shortUrl.save();
    res.redirect(shortUrl.full);
  } catch (err) {
    console.log(err);
  }
});

const PORT = 3030;

app.listen(PORT, function () {
  console.log("Listening on port", PORT);
});
