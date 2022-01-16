const mongoose = require("mongoose");

const authModel = mongoose.Schema({
  email: String,
  password: String,
  fullName: String,
});

authModel.set("timestamps", true);

module.exports = mongoose.model("auth", authModel);
