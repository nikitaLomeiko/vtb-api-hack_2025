import { create } from "zustand";

export const useTransaction = create((set, get) => ({
  transaction: {
    tansactionList: [
      {
        accountId: "acc-14",
        amount: {
          amount: "55000.00",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "IssuedDebitTransfer",
        },
        bookingDateTime: "2025-10-27T16:44:47.055737Z",
        creditDebitIndicator: "Debit",
        status: "Booked",
        transactionId: "tx-4fd585bec5db",
        transactionInformation: "Пополнение депозита 423c5794b171ea2411",
        valueDateTime: "2025-10-27T16:44:47.055737Z",
      },
      {
        accountId: "acc-14",
        amount: {
          amount: "5556.59",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "IssuedDebitTransfer",
        },
        bookingDateTime: "2025-10-23T22:37:08.532650Z",
        creditDebitIndicator: "Debit",
        status: "Booked",
        transactionId: "tx-demo-003-010",
        transactionInformation: "👕 Одежда и обувь",
        valueDateTime: "2025-10-23T22:37:08.532650Z",
      },
      {
        accountId: "acc-14",
        amount: {
          amount: "6426.18",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "IssuedDebitTransfer",
        },
        bookingDateTime: "2025-10-19T22:37:08.532650Z",
        creditDebitIndicator: "Debit",
        status: "Booked",
        transactionId: "tx-demo-003-009",
        transactionInformation: "💊 Аптека",
        valueDateTime: "2025-10-19T22:37:08.532650Z",
      },
      {
        accountId: "acc-14",
        amount: {
          amount: "2313.75",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "IssuedDebitTransfer",
        },
        bookingDateTime: "2025-10-16T22:37:08.532650Z",
        creditDebitIndicator: "Debit",
        status: "Booked",
        transactionId: "tx-demo-003-008",
        transactionInformation: "🎬 Кинотеатр",
        valueDateTime: "2025-10-16T22:37:08.532650Z",
      },
      {
        accountId: "acc-14",
        amount: {
          amount: "18052.25",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "IssuedDebitTransfer",
        },
        bookingDateTime: "2025-10-14T22:37:08.532650Z",
        creditDebitIndicator: "Debit",
        status: "Booked",
        transactionId: "tx-demo-003-007",
        transactionInformation: "📚 Ozon",
        valueDateTime: "2025-10-14T22:37:08.532650Z",
      },
      {
        accountId: "acc-14",
        amount: {
          amount: "3585.41",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "IssuedDebitTransfer",
        },
        bookingDateTime: "2025-10-11T22:37:08.532650Z",
        creditDebitIndicator: "Debit",
        status: "Booked",
        transactionId: "tx-demo-003-006",
        transactionInformation: "🚕 Яндекс.Такси",
        valueDateTime: "2025-10-11T22:37:08.532650Z",
      },
      {
        accountId: "acc-14",
        amount: {
          amount: "1551.34",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "IssuedDebitTransfer",
        },
        bookingDateTime: "2025-10-08T22:37:08.532650Z",
        creditDebitIndicator: "Debit",
        status: "Booked",
        transactionId: "tx-demo-003-005",
        transactionInformation: "☕ Кофейня Starbucks",
        valueDateTime: "2025-10-08T22:37:08.532650Z",
      },
      {
        accountId: "acc-14",
        amount: {
          amount: "23738.71",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "ReceivedCreditTransfer",
        },
        bookingDateTime: "2025-10-06T22:37:08.532650Z",
        creditDebitIndicator: "Credit",
        status: "Booked",
        transactionId: "tx-demo-003-004",
        transactionInformation: "💰 Фриланс проект",
        valueDateTime: "2025-10-06T22:37:08.532650Z",
      },
      {
        accountId: "acc-14",
        amount: {
          amount: "47110.98",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "IssuedDebitTransfer",
        },
        bookingDateTime: "2025-10-04T22:37:08.532650Z",
        creditDebitIndicator: "Debit",
        status: "Booked",
        transactionId: "tx-demo-003-003",
        transactionInformation: "🏠 Аренда жилья",
        valueDateTime: "2025-10-04T22:37:08.532650Z",
      },
      {
        accountId: "acc-14",
        amount: {
          amount: "8183.31",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "IssuedDebitTransfer",
        },
        bookingDateTime: "2025-10-03T22:37:08.532650Z",
        creditDebitIndicator: "Debit",
        status: "Booked",
        transactionId: "tx-demo-003-002",
        transactionInformation: "🏪 Продукты в магазине",
        valueDateTime: "2025-10-03T22:37:08.532650Z",
      },
      {
        accountId: "acc-14",
        amount: {
          amount: "96378.58",
          currency: "RUB",
        },
        bankTransactionCode: {
          code: "ReceivedCreditTransfer",
        },
        bookingDateTime: "2025-10-01T22:37:08.532650Z",
        creditDebitIndicator: "Credit",
        status: "Booked",
        transactionId: "tx-demo-003-001",
        transactionInformation: "💼 Зарплата за октябрь",
        valueDateTime: "2025-10-01T22:37:08.532650Z",
      },
    ],
    activeFilter: "all",
    dateRange: { start: "", end: "" },
    searchQuery: "",
    isFiltersExpanded: false,
    queryMap: {},
  },
  removeFilter: (filterType) => {
    const state = get().transaction;

    switch (filterType) {
      case "type":
        set({
          transaction: {
            ...state,
            activeFilter: "all",
          },
        });
        break;
      case "startDate":
        set({
          transaction: {
            ...state,
            dateRange: { ...state.dateRange, start: "" },
          },
        });
        break;
      case "endDate":
        set({
          transaction: {
            ...state,
            dateRange: { ...state.dateRange, end: "" },
          },
        });
        break;
      case "search":
        set({
          transaction: {
            ...state,
            searchQuery: "",
          },
        });
        break;
    }
  },
  dateChange: (type, value) => {
    const store = get().transaction;

    set({
      transaction: {
        ...store,
        dateRange: { ...store.dateRange, [type]: value },
      },
    });
  },
  clearFilters: () => {
    const store = get().transaction;

    set({
      transaction: {
        ...store,
        dateRange: { start: "", end: "" },
        searchQuery: "",
        activeFilter: "any",
      },
    });
  },
  toggleFilterExpanded: () => {
    const store = get().transaction;

    set({
      transaction: {
        ...store,
        isFiltersExpanded: !store.isFiltersExpanded,
      },
    });
  },
  setSearchQuery: (value) => {
    const store = get().transaction;

    set({
      transaction: {
        ...store,
        searchQuery: value,
      },
    });
  },
  setActiveFilter: (value) => {
    const store = get().transaction;

    set({
      transaction: {
        ...store,
        activeFilter: value,
      },
    });
  },
}));
