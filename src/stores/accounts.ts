import { defineStore } from 'pinia'

export type AccountType = 'local' | 'ldap'

export interface Label {
  text: string
}

export interface Account {
  labels: Label[]
  type: AccountType
  login: string
  password: string | null
  id: number
}

export const useAccountsStore = defineStore('accounts', {
  state: () => ({
    accounts: [] as Account[],
    nextId: 1,
  }),
  actions: {
    addAccount() {
      this.accounts.push({
        id: this.nextId++,
        labels: [],
        type: 'local',
        login: '',
        password: '',
      })
    },
    updateAccount(updated: Account) {
      const idx = this.accounts.findIndex(acc => acc.id === updated.id)
      if (idx !== -1) {
        this.accounts[idx] = { ...updated }
      }
    },
    removeAccount(id: number) {
      this.accounts = this.accounts.filter(acc => acc.id !== id)
    },
  },
  persist: true, 
})
