// src/store/index.js
import { defineStore } from "pinia"

export const useShowStore = defineStore("showStore", {
  state: () => {
    return {
      isDialog: false,
      isLoading: false,
      loginModal: false
    }
  },
  actions: {
    /*** update any root value of showStore */
    updateShow(data) {
      if (typeof this[data.key] !== "undefined") {
        this[data.key] = (typeof data.value === "boolean") ? data.value : false
      }
    }
  },
})
