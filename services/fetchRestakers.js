// services/fetchRestakers.js
async function fetchRestakers() {
  return [
    {
      user: "0x1234567890ABCDEF",
      amount_restaked: "50",
      validator: "0xValidator123"
    },
    {
      user: "0x0987654321FEDCBA",
      amount_restaked: "120",
      validator: "0xValidator456"
    }
  ];
}

module.exports = fetchRestakers;
