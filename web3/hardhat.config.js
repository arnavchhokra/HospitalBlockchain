require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-verify");
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: '0.8.16',
    settings: {
      viaIR: true,
      optimizer: {
        enabled: true,
        runs: 100,
      },
    },
  },
  networks: {
    mumbai: {
      url: "https://polygon-mumbai.g.alchemy.com/v2/w_Hkgh2Ou_hD07mJNE8Mlw0Ka5Y1Uh21",
      accounts:  ["478307691c26f630d413acbedea39201f3e4c65b5e3eddaac140313b0ef64308"],
      chainId: 80001,
      gasPrice: 8000000000,
      gas: 12450000,
      timeout: 60000,
      websockets: true,
    },
  },
  etherscan: {
    apiKey: "P7KCJCMADMZY96R63TWNYHUVJBG771AEU5"
  },
  sourcify: {
    enabled: true
  }
}

