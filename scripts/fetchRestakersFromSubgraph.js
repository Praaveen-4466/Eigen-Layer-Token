const axios = require("axios");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("../utils/db");
const Restaker = require("../models/Restaker");

const SUBGRAPH_URL =
  "https://gateway.thegraph.com/api/subgraphs/id/68g9WSC4QTUJmMpuSbgLNENrcYha4mPmXhWGCoupM7kB";

const RESTAKERS_QUERY = `
{
  restakings(first: 20) {
    restaker
    amount
    operator {
      id
    }
  }
}
`;

async function fetchAndSaveRestakers() {
  await connectDB();

  try {
    const response = await axios.post(
      SUBGRAPH_URL,
      { query: RESTAKERS_QUERY },
      {
        headers: {
          Authorization: `Bearer ${process.env.GRAPH_API_KEY}`,
        },
      }
    );

    const data = response.data.data?.restakings || [];
    console.log("Fetched restaking entries:", data.length);

    for (const entry of data) {
      const restaker = {
        user: entry.restaker,
        amount_restaked: entry.amount,
        validator: entry.operator.id,
      };

      await Restaker.updateOne(
        { user: restaker.user },
        { $set: restaker },
        { upsert: true }
      );

      console.log(`Saved restaker: ${restaker.user}`);
    }

    console.log("All restakers synced!");
  } catch (err) {
    console.error("Error fetching from subgraph:", err.message);
  } finally {
    mongoose.disconnect();
  }
}

fetchAndSaveRestakers();
