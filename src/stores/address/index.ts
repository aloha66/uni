import { defineStore } from 'pinia'

export const useStore = defineStore('address', {
  // other options...
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      globalAddr: null,
    }
  },
})
