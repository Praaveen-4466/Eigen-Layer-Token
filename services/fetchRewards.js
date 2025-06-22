// services/fetchRewards.js
async function fetchRewards(address) {
  // This is mock logic - in real-world you'd fetch from blockchain/subgraph
  const mockData = {
    "0xabc123": {
      total_rewards: "15",
      breakdown: [
        {
          validator: "0xValidatorABC",
          amount: "10",
          timestamp: "2024-06-01T12:00:00Z"
        },
        {
          validator: "0xValidatorXYZ",
          amount: "5",
          timestamp: "2024-06-03T15:00:00Z"
        }
      ]
    },
    "0xuser456": {
      total_rewards: "30",
      breakdown: [
        {
          validator: "0xValidatorDEF",
          amount: "30",
          timestamp: "2024-06-01T10:00:00Z"
        }
      ]
    }
  };

  return mockData[address.toLowerCase()] || {
    total_rewards: "0",
    breakdown: []
  };
}

module.exports = fetchRewards;
