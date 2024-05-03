const hre = require("hardhat");
const fs = require("fs");
async function main() {
  console.log("starting");
  const contract = await hre.ethers.deployContract("ShareToSecure")
  await contract.waitForDeployment();
  console.log(contract);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});