require("@nomiclabs/hardhat-waffle")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.0",
  networks: {
    Sepolia: {
      url: "https://eth-sepolia.g.alchemy.com/v2/mpxyHBRCqlXiWu1z20mwQxm_7-n3SmWN",
      accounts: ["20746feb59a4fdce2b3f654d6b2c72588e51a4d86d1ba1355bd5316cfe6d694d"]
    }
  }
};