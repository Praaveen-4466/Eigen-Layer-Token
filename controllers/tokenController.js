// controllers/tokenController.js
const Token = require("../models/Token");

// GET /tokens
exports.getTokens = async (req, res) => {
  try {
    const tokens = await Token.find();
    res.json(tokens);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tokens" });
  }
};

// POST /tokens (optional - use only if you want to add manually)
exports.addToken = async (req, res) => {
  try {
    const newToken = new Token(req.body);
    const saved = await newToken.save();
    res.status(201).json(saved);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Failed to save token", message: err.message });
  }
};
