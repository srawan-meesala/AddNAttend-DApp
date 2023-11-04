require("@nomiclabs/hardhat-waffle")
require('dotenv').config();

const PRIVATE_KEY = process.env.PRIVATE_KEY

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.7.0",
  networks: {
    Sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/rvcpVcnAm-_S_3Twu0P9BWgm81YE4mNp",
      accounts: [PRIVATE_KEY]
    }
  }
};