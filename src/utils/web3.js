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
  11155420: "ETH", // Optimism-Sepolia Testnet
  // Add other networks as needed
};

export const getChainTokenSymbol = (chainId) => {
  return networkTokenSymbols[chainId] || 'UNKNOWN';
}