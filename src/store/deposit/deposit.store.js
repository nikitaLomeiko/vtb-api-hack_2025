import { create } from 'zustand'

export const useDepositStore = create((set, get) => ({
  deposits: [],
  isLoading: false,
  error: null,

  // Моковые данные для выбора при создании
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

  // Пользовательские вклады (созданные)
  userDeposits: [],

  fetchDeposits: async () => {
    set({ isLoading: true, error: null })
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      set({
        deposits: get().mockDeposits,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: 'Ошибка при загрузке вкладов',
        isLoading: false,
      })
    }
  },

  // Создание нового вклада
  createDeposit: (depositData) => {
    const newDeposit = {
      id: `user_deposit_${Date.now()}`,
      ...depositData,
      createdAt: new Date().toISOString(),
      currentAmount: depositData.amount,
      status: 'active',
    }

    set((state) => ({
      userDeposits: [newDeposit, ...state.userDeposits],
    }))

    return newDeposit
  },

  // Удаление вклада
  deleteDeposit: (depositId) => {
    set((state) => ({
      userDeposits: state.userDeposits.filter(
        (deposit) => deposit.id !== depositId
      ),
    }))
  },

  // Получение продукта по ID
  getProductById: (productId) => {
    return get().mockDeposits.find((product) => product.productId === productId)
  },
}))
