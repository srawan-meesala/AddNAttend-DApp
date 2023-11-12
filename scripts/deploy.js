const hre = require("hardhat");
const namehash = require('eth-ens-namehash');
const tld = "test";
const ethers = hre.ethers;
const utils = ethers.utils;
const labelhash = (label) => utils.keccak256(utils.toUtf8Bytes(label))
const ZERO_HASH = "0x0000000000000000000000000000000000000000000000000000000000000000";
async function main() {
  const ENSRegistry = await ethers.getContractFactory("ENSRegistry")
  const FIFSRegistrar = await ethers.getContractFactory("FIFSRegistrar")

  const ens = await ENSRegistry.deploy()
  await ens.deployed()
  const registrar = await FIFSRegistrar.deploy(ens.address, namehash.hash(tld));
  await registrar.deployed()
  await setupRegistrar(ens, registrar);
  const eventManage = await hre.ethers.getContractFactory("EventManager");
  const eventManager = await eventManage.deploy(ens.address);
  await eventManager.deployed();
  console.log(`ENS Address: ${ens.address}`);
  console.log(`Contract Address: ${eventManager.address}`);
};

async function setupRegistrar(ens, registrar) {
  await ens.setSubnodeOwner(ZERO_HASH, labelhash(tld), registrar.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });