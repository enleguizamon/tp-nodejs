const mongoose = require("mongoose");

const movieSchema = mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  image: {
    type: String,
    required: true
  },
  type: {
    type: String
  }
})

module.exports = mongoose.model("Movie", movieSchema);