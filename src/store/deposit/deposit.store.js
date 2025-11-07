import { create } from 'zustand'

export const useDepositStore = create((set) => ({
  deposits: [],
  isLoading: false,
  error: null,
  selectedDeposit: null,

  // Моковые данные
  mockDeposits: [
    {
      productId: 'deposit_1',
      productType: 'deposit',
      productName: 'Накопительный счёт',
      description: 'Универсальный вклад с возможностью пополнения и снятия',
      interestRate: 5.5,
      minAmount: 1000,
      maxAmount: 1000000,
      termMonths: 12,
    },
    {
      productId: 'deposit_2',
      productType: 'deposit',
      productName: 'Премиум вклад',
      description: 'Высокая ставка для крупных сумм с фиксированным сроком',
      interestRate: 7.2,
      minAmount: 50000,
      maxAmount: 5000000,
      termMonths: 24,
    },
    {
      productId: 'deposit_3',
      productType: 'deposit',
      productName: 'Пенсионный',
      description:
        'Специальные условия для пенсионеров с ежемесячной выплатой процентов',
      interestRate: 6.8,
      minAmount: 10000,
      maxAmount: 3000000,
      termMonths: 18,
    },
  ],

  fetchDeposits: async () => {
    set({ isLoading: true, error: null })
    try {
      // Имитация загрузки с задержкой
      await new Promise((resolve) => setTimeout(resolve, 1000))

      set({
        deposits: useDepositStore.getState().mockDeposits,
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
