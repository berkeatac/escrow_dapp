const path = require("path");

module.exports = {
  networks:
  {
    develop: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    test: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
  },
  contracts_build_directory: "./client/src/contracts"
};
