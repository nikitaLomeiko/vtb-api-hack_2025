import { create } from 'zustand'
import { ApiClient } from '@api'

export const useDepositStore = create((set) => ({
  deposits: [],
  isLoading: false,
  error: null,
  selectedDeposit: null,

  fetchDeposits: async () => {
    set({ isLoading: true, error: null })
    try {
      const response = await ApiClient('/products?product_type=deposit')
      set({
        deposits: response.data,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: 'Ошибка при загрузке вкладов',
        isLoading: false,
      })
    }
  },

  setSelectedDeposit: (deposit) => set({ selectedDeposit: deposit }),
}))
