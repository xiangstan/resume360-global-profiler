// src/store/index.js
import { defineStore } from "pinia"

export const useWeb3Store = defineStore("web3Store", {
  state: () => {
    return {
      ethAddress: '',
      isInternal: false,
    }
  },
  actions: {
    /*** update any root value of showStore */
    updateData(data) {
      if (typeof this[data.key] !== "undefined") {
        this[data.key] = data.value
      }
    }
  },
})
