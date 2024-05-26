// src/store/index.js
import { defineStore } from "pinia";
import { ethers } from 'ethers';

export const useWeb3Store = defineStore("web3Store", {
  state: () => {
    return {
      getAddress: '',
      chainId: 0,
      chainName: '',
      getProvider: null,
      getSigner: null,
      getBalance: 0,
      isConnected: false
    }
  },
  actions: {
    async connectToMetaMask() {
      if (window.ethereum) {
        try {
          await window.ethereum.request({ method: 'eth_requestAccounts' });
          const provider = new ethers.BrowserProvider(window.ethereum);
          this.getProvider = provider;
          const { name, chainId } = await provider.getNetwork();
          this.chainId = chainId;
          this.chainName = name;
          this.isConnected = true;
          this.getSigner = await provider.getSigner();
          this.getAddress = this.getSigner.address;
          const ethBalance = await provider.getBalance(this.getAddress);
          this.getBalance = ethers.formatEther(ethBalance);
          //console.log(this.getSigner)
          // Handle network changes or other setup here
        } catch (error) {
          this.isConnected = false;
          console.error('Error connecting to MetaMask:', error);
        }
      } else {
        this.isConnected = false;
        console.error('MetaMask not detected.');
      }
    },
    /*** disconnect the current wallet */
    async discounnectWallet() {
      try {
        if (window.ethereum) {
          this.getAddress = '';
          this.chainId = 0;
          this.chainName = '';
          this.getProvider = null;
          this.getSigner = null;
          this.getBalance = 0;
          this.isConnected = false;
          await window.ethereum.request({
            method: "eth_requestAccounts",
            params: [{eth_accounts: {}}]
          })
        }
      }
      catch(error) {
        console.error('Error disconnecting from MetaMask:', error);
      }
    },
    /*** update any root value of showStore */
    updateData(data) {
      if (typeof this[data.key] !== "undefined") {
        this[data.key] = data.value
      }
    }
  },
})
