// src/store/index.js
import { defineStore } from "pinia"

export const useMyAccount = defineStore("myAccount", {
  state: () => {
    return {
      email: "",
      profile: {
        uaid: 0
      },
    }
  },
  actions: {
    /*** update any root value of showStore */
    updateAccountData(data) {
      if (typeof this[data.key] !== "undefined") {
        this[data.key] = data.value
      }
    },
  }
})