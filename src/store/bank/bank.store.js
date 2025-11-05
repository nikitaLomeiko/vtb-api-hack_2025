import { create } from "zustand";

export const useBank = create((set) => ({
  bank: {
    total: 267233,
    bankList: [
      {
        name: "Тинькофф",
        accounts: [
          {
            id: "3463463467",
            balance: 15670,
            name: "Основной счет",
          },
          {
            id: "3463463425",
            balance: 120000,
            name: "Зарплата",
          },
        ],
      },
      {
        name: "ВТБ",
        accounts: [
          {
            id: "23523523523",
            balance: 50000,
            name: "Деп",
          },
          {
            id: "235235235235",
            balance: 25000,
            name: "Додеп",
          },
          {
            id: "23523523536",
            balance: 12500,
            name: "Дододеп",
          },
          {
            id: "235235",
            balance: 6250,
            name: "Додододеп",
          },
          {
            id: "23523523535",
            balance: 3125,
            name: "Дододододеп",
          },
          {
            id: "243652345",
            balance: 1562.5,
            name: "Додододододеп",
          },
          {
            id: "243652345",
            balance: 781.25,
            name: "Дододододододеп",
          },
          {
            id: "243652345",
            balance: 390.625,
            name: "Додододододододеп",
          },
          {
            id: "243652345",
            balance: 195.3125,
            name: "Дододододододододеп",
          },
        ],
      },
    ],
  },
  setBank: (bank) => set(bank),
}));
