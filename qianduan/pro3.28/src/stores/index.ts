import { defineStore } from 'pinia'
export const Store = defineStore('store', {
  state: () => {
    return {
      userId: '6'
    }
  },
  getters: {
    getUserId: (state) => state.userId,
  },
  actions: {
    setUserId(key: string) {
      this.userId = key
      window.sessionStorage.setItem('userId', this.userId)
    },
  }
})
