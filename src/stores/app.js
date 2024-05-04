// src/store/index.js
import { defineStore } from "pinia"

export const useAppStore = defineStore("appStore", {
  state: () => {
    return {
      isDarkMode: false,
    }
  },
  actions: {
    setDarkMode(data) {
      const darkMode = (typeof data === "boolean") ? data : false
      this.isDarkMode = darkMode
    }
  },
})
