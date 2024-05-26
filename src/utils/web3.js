import { ethers } from 'ethers';
import { useWeb3Store } from '@/stores/web3';

const web3Store = useWeb3Store();

/*** update chain name */
export const updateChainName = (name) => {
  web3Store.updateData({
    key: 'chainName',
    value: name
  });
}

/*** list network default token symbols */
const networkTokenSymbols = {
  1: "ETH", // Ethereum Mainnet
  3: "ETH", // Ropsten Testnet
  4: "ETH", // Rinkeby Testnet
  5: "ETH", // Goerli Testnet
  42: "ETH", // Kovan Testnet
  56: "BNB", // Binance Smart Chain Mainnet
  97: "BNB", // Binance Smart Chain Testnet
  137: "MATIC", // Polygon Mainnet
  80001: "MATIC", // Mumbai Testnet
  421614: "Sepolia Ethereum",
  11155420: "ETH", // Optimism-Sepolia Testnet
  // Add other networks as needed
};

/*** list network used token address */
const networkTokenAddressList = {
  421614: {
    'eth': '0xd30e2101a97dcbAeBCBC04F14C3f624E67A35165',
    'link': '0x0FB99723Aee6f420beAD13e6bBB79b7E6F034298'
  }
};

export const getChainTokenSymbol = (chainId) => {
  return networkTokenSymbols[chainId] || 'UNKNOWN';
}

/*** get a selected token's latested reported price */
export const getLatestTokenPrice = async (address) => {
  const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/arbitrum_sepolia")
  const aggregatorV3InterfaceABI = [
    {
      inputs: [],
      name: "decimals",
      outputs: [{ internalType: "uint8", name: "", type: "uint8" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "description",
      outputs: [{ internalType: "string", name: "", type: "string" }],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint80", name: "_roundId", type: "uint80" }],
      name: "getRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "latestRoundData",
      outputs: [
        { internalType: "uint80", name: "roundId", type: "uint80" },
        { internalType: "int256", name: "answer", type: "int256" },
        { internalType: "uint256", name: "startedAt", type: "uint256" },
        { internalType: "uint256", name: "updatedAt", type: "uint256" },
        { internalType: "uint80", name: "answeredInRound", type: "uint80" },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "version",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  // Instantiate contract
  const priceFeed = new ethers.Contract(address, aggregatorV3InterfaceABI, provider);
  try {
    // Fetch latest round data
    const roundData = await priceFeed.latestRoundData();
    // Fetch the number of decimals
    const decimals = await priceFeed.decimals();
    // Explicitly convert decimals to a regular number
    const decimalsNumber = Number(decimals);
    // Explicitly convert answer to a regular number
    const answerNumber = Number(roundData[1]); // Index 1 contains the answer
    // Retrieve the answer and adjust it to get the real price
    const realPrice = answerNumber / 10 ** decimalsNumber;
    return realPrice;
  } catch (error) {
    console.error('Error fetching data:', error);
    return 0;
  }
}

/*** get selected token address from a network */
export const getNetworkTokenAddress = (networkId) => {
  return networkTokenAddressList[Number(networkId)] || {
    'eth': null,
    'link': null
  }
}