// routes/tokens.js
const express = require("express");
const router = express.Router();

const tokenController = require("../controllers/tokenController");

router.get("/", tokenController.getTokens);
router.post("/", tokenController.addToken); // Optional

module.exports = router;
