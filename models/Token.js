// models/Token.js
const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  id: { type: String, unique: true },
  name: String,
  symbol: String,
  decimals: Number,
});

module.exports = mongoose.model("Token", tokenSchema);
