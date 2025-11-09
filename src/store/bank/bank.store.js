import { create } from 'zustand'

export const useBank = create((set, get) => ({
  bank: {
    total: 3000000,
    bankList: [],
    // bankList: [
    //   {
    //     name: 'Тинькофф',
    //     accounts: [
    //       {
    //         id: '3463463467',
    //         balance: 15670,
    //         name: 'Основной счет',
    //       },
    //       {
    //         id: '3463463425',
    //         balance: 120000,
    //         name: 'Зарплата',
    //       },
    //     ],
    //   },
    //   {
    //     name: 'ВТБ',
    //     accounts: [
    //       {
    //         id: '23523523523',
    //         balance: 50000,
    //         name: 'Деп',
    //       },
    //       {
    //         id: '235235235235',
    //         balance: 25000,
    //         name: 'Додеп',
    //       },
    //       {
    //         id: '23523523536',
    //         balance: 12500,
    //         name: 'Дододеп',
    //       },
    //       {
    //         id: '235235',
    //         balance: 6250,
    //         name: 'Додододеп',
    //       },
    //       {
    //         id: '23523523535',
    //         balance: 3125,
    //         name: 'Дододододеп',
    //       },
    //       {
    //         id: '243652345',
    //         balance: 1562.5,
    //         name: 'Додододододеп',
    //       },
    //       {
    //         id: '243652345',
    //         balance: 781.25,
    //         name: 'Дододододододеп',
    //       },
    //       {
    //         id: '243652345',
    //         balance: 390.625,
    //         name: 'Додододододододеп',
    //       },
    //       {
    //         id: '243652345',
    //         balance: 195.3125,
    //         name: 'Дододододододододеп',
    //       },
    //     ],
    //   },
    // ],
  },

  // Для формы добавления банка
  availableBanks: [],
  setAvailableBanks: (banks) => set({ availableBanks: banks }),

  // Для выбранного банка в форме
  selectedBank: null,
  setSelectedBank: (bank) => set({ selectedBank: bank }),

  // Функция добавления денег к total
  addMoney: (amount) => {
    const state = get()
    set({
      bank: {
        ...state.bank,
        total: state.bank.total + amount,
      },
    })
  },

  // Функция снятия денег с total
  subtractMoney: (amount) => {
    const state = get()
    const newTotal = state.bank.total - amount
    set({
      bank: {
        ...state.bank,
        total: newTotal < 0 ? 0 : newTotal,
      },
    })
  },

  setBank: (bank) => set({ bank }),

  // метод для обновления списка банков из API
  setBankList: (bankList) =>
    set((state) => ({
      bank: { ...state.bank, bankList },
    })),
}))
