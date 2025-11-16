import hardhatEthers from "@nomicfoundation/hardhat-ethers";
import hardhatVerify from "@nomicfoundation/hardhat-verify";
import { configVariable } from "hardhat/config";

const config = {
  solidity: { version: "0.8.24", settings: { optimizer: { enabled: true, runs: 200 } } },
  plugins: [hardhatEthers, hardhatVerify],
  chainDescriptors: {
    56: {
      name: "Binance Smart Chain",
      blockExplorers: {
        etherscan: {
          name: "BscScan",
          url: "https://bscscan.com",
          apiUrl: "https://api.etherscan.io/v2/api"
        }
      }
    }
  },
  networks: {
    bsc: {
      type: "http",
      url: configVariable("BSC_RPC_URL"),   // e.g. a public or paid BSC endpoint
      accounts: [configVariable("DEPLOYER_PK")],
      blockExplorers: {
        etherscan: {
          name: "BscScan",
          url: "https://bscscan.com",
          apiUrl: "https://api.etherscan.io/v2/api"
        }
      }
    }
  },
  verify: {
    blockscout: {
      enabled: false
    },
    etherscan: {
      apiKey: configVariable("BSCSCAN_API_KEY"),
      apiUrl: "https://api.etherscan.io/v2/api"
    }
  }
};

export default config;
