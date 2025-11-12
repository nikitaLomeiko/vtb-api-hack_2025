import { create } from 'zustand'

export const useContactStore = create((set, get) => ({
  contacts: [
    { id: 'contact_1', name: 'Иван Иванов', account: '40817810099910004312' },
    { id: 'contact_2', name: 'Петр Петров', account: '40817810088820005678' },
    {
      id: 'contact_3',
      name: 'Мария Сидорова',
      account: '40817810077730008901',
    },
    {
      id: 'contact_4',
      name: 'Алексей Козлов',
      account: '40817810066640001234',
    },
  ],
  recentTransactions: [],

  addRecentTransaction: (transaction) => {
    set((state) => ({
      recentTransactions: [
        transaction,
        ...state.recentTransactions.slice(0, 4),
      ],
    }))
  },

  getContacts: () => get().contacts,
}))
