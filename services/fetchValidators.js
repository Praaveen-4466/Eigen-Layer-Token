// services/fetchValidators.js
async function fetchValidators() {
  return [
    {
      operator_id: "0xOperatorABC",
      total_delegated_stake: "1000",
      slash_history: [
        {
          timestamp: "2024-03-01T00:00:00Z",
          amount: "5",
          reason: "downtime"
        }
      ],
      status: "active"
    },
    {
      operator_id: "0xOperatorXYZ",
      total_delegated_stake: "2000",
      slash_history: [],
      status: "jailed"
    }
  ];
}

module.exports = fetchValidators;
