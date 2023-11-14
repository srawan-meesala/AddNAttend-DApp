const hre = require("hardhat");
const ethers = hre.ethers;

async function main() {
  const eventToken = await ethers.getContractFactory("eventToken");
  const token = await eventToken.deploy("AddnAttend","ANA");
  await token.deployed();
  const eventApp = await hre.ethers.getContractFactory("AddnAttend");
  const eventManager = await eventApp.deploy(token.address);
  await eventManager.deployed();
  console.log(`Token Address: ${token.address}`);
  console.log(`Contract Address: ${eventManager.address}`);
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
});