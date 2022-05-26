const mongoose = require("mongoose");
const shortId = require("shortid");

const urlsSchema = mongoose.Schema({
  full: {
    type: "string",
    required: true,
  },
  short: {
    type: "string",
    default: shortId.generate,
  },
  click: {
    type: "number",
    default: 0,
  },
});

module.exports = mongoose.model("url", urlsSchema);
