// src/store/index.js
import { defineStore } from "pinia"

export const useShowStore = defineStore("showStore", {
  state: () => {
    return {
      isAside: false,
      isDialog: false,
      isLoading: false,
      loginModal: false,
      functionData: null
    }
  },
  actions: {
    /*** update any root value of showStore */
    updateShow(data) {
      if (typeof this[data.key] !== "undefined") {
        this[data.key] = (typeof data.value === "boolean") ? data.value : false
      }
    },
    updatefunctionValue(data) {
      this.functionData = data
    }
  },
})
