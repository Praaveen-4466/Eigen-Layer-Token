// scripts/fetchFromSubgraph.js
const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../utils/db"); // Database connection

const Token = require("../models/Token");

const SUBGRAPH_URL =
  "https://gateway.thegraph.com/api/subgraphs/id/68g9WSC4QTUJmMpuSbgLNENrcYha4mPmXhWGCoupM7kB";

const TOKENS_QUERY = `
{
  tokens(first: 20) {
    id
    name
    symbol
    decimals
  }
}
`;

async function fetchAndSaveTokens() {
  await connectDB();

  try {
    const response = await axios.post(
      SUBGRAPH_URL,
      { query: TOKENS_QUERY },
      {
        headers: {
          Authorization: `Bearer ${process.env.GRAPH_API}`,
        },
      }
    );

    console.log(
      "Raw data from subgraph:",
      JSON.stringify(response.data, null, 2)
    );

    const tokens = response.data.data?.tokens || [];
    console.log("Fetched token entries:", tokens.length);

    for (const entry of tokens) {
      const token = {
        id: entry.id,
        name: entry.name,
        symbol: entry.symbol,
        decimals: entry.decimals,
      };

      await Token.updateOne(
        { id: token.id },
        { $set: token },
        { upsert: true }
      );

      console.log(`Saved token: ${token.symbol}`);
    }

    console.log("All tokens synced!");
  } catch (err) {
    console.error("Error fetching from subgraph:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

fetchAndSaveTokens();
