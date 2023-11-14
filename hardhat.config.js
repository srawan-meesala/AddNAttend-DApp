require("@nomiclabs/hardhat-waffle")
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.17",
        settings: {},
      },
      {
        version: "0.8.4",
        settings: {},
      },
      {
        version: "0.8.0",
        settings: {},
      },
      {
        version: "0.7.0",
        settings: {},
      },
      {
        version: "0.5.0",
        settings: {},
      },
      // Add more compiler versions as needed
    ],
  },
  networks: {
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/ielVay6fs3uDtGEDfAKbpa8lG1TpOBoo",
      accounts: [PRIVATE_KEY]
    }
  }
};