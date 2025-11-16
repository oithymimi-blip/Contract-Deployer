import hre from "hardhat";

async function main() {
  const connection = await hre.network.connect();
  const ethers = connection.ethers;
  const USDT = process.env.USDT_BSC; // e.g. 0x55d3...7955
  const C = await ethers.getContractFactory("StablePullerV2");
  const c = await C.deploy(USDT);
  await c.waitForDeployment();
  console.log("StablePullerV2:", await c.getAddress());
}

main().catch((e) => { console.error(e); process.exit(1); });
