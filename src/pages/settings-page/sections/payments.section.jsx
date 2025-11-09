import React, { useState } from 'react'
import {
  CreditCardIcon,
  PlusIcon,
  TrashIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowPathIcon,
  BanknotesIcon,
  WalletIcon,
  ClockIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'

export const PaymentsSection = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      number: '553691******1234',
      type: 'mastercard',
      holder: 'Иван Иванов',
      expiry: '12/25',
      cvv: '***',
      isDefault: true,
      balance: 154230,
      currency: 'RUB',
    },
    {
      id: 2,
      number: '427601******5678',
      type: 'visa',
      holder: 'Иван Иванов',
      expiry: '09/24',
      cvv: '***',
      isDefault: false,
      balance: 89250,
      currency: 'RUB',
    },
    {
      id: 3,
      number: '521324******9012',
      type: 'mastercard',
      holder: 'Иван Иванов',
      expiry: '03/26',
      cvv: '***',
      isDefault: false,
      balance: 0,
      currency: 'USD',
    },
  ])

  const [wallets, setWallets] = useState([
    {
      id: 1,
      type: 'yoomoney',
      name: 'ЮMoney',
      balance: 45250,
      currency: 'RUB',
    },
    {
      id: 2,
      type: 'qiwi',
      name: 'QIWI Кошелек',
      balance: 12500,
      currency: 'RUB',
    },
  ])

  const [autopayments, setAutopayments] = useState([
    {
      id: 1,
      name: 'Интернет',
      provider: 'Ростелеком',
      amount: 750,
      nextPayment: '2024-01-25',
      card: '553691******1234',
      active: true,
    },
    {
      id: 2,
      name: 'Мобильная связь',
      provider: 'МТС',
      amount: 450,
      nextPayment: '2024-01-28',
      card: '427601******5678',
      active: true,
    },
    {
      id: 3,
      name: 'Стриминговый сервис',
      provider: 'Yandex Plus',
      amount: 299,
      nextPayment: '2024-02-01',
      card: '553691******1234',
      active: false,
    },
  ])

  const [limits, setLimits] = useState({
    daily: 50000,
    monthly: 300000,
    single: 150000,
  })

  const [showCardDetails, setShowCardDetails] = useState({})

  const toggleCardDetails = (cardId) => {
    setShowCardDetails((prev) => ({
      ...prev,
      [cardId]: !prev[cardId],
    }))
  }

  const setDefaultCard = (cardId) => {
    setCards((prev) =>
      prev.map((card) => ({
        ...card,
        isDefault: card.id === cardId,
      }))
    )
  }

  const deleteCard = (cardId) => {
    setCards((prev) => prev.filter((card) => card.id !== cardId))
  }

  const deleteWallet = (walletId) => {
    setWallets((prev) => prev.filter((wallet) => wallet.id !== walletId))
  }

  const toggleAutopayment = (paymentId) => {
    setAutopayments((prev) =>
      prev.map((payment) =>
        payment.id === paymentId
          ? { ...payment, active: !payment.active }
          : payment
      )
    )
  }

  const deleteAutopayment = (paymentId) => {
    setAutopayments((prev) =>
      prev.filter((payment) => payment.id !== paymentId)
    )
  }

  const updateLimit = (limitType, value) => {
    setLimits((prev) => ({
      ...prev,
      [limitType]: parseInt(value) || 0,
    }))
  }

  const formatBalance = (amount, currency) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: currency,
    }).format(amount)
  }

  const getCardIcon = (type) => {
    return type === 'visa' ? '💳' : '🔷'
  }

  const getWalletIcon = (type) => {
    const icons = {
      yoomoney: '💰',
      qiwi: '🥝',
      webmoney: '🕸️',
      paypal: '🔵',
    }
    return icons[type] || '💼'
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <CreditCardIcon className="w-12 h-12 text-(--accent-primary)" />
        </div>
        <h1 className="text-3xl font-bold text-(--text-primary)">Платежи</h1>
        <p className="text-(--text-secondary) mt-2">
          Управление картами, кошельками и автоматическими платежами
        </p>
      </div>

      <div className="grid gap-8">
        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <CreditCardIcon className="w-6 h-6 text-(--accent-primary)" />
              <h2 className="text-xl font-semibold text-(--text-primary)">
                Банковские карты
              </h2>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-(--accent-primary) text-white rounded-lg hover:bg-(--accent-hover) transition-colors">
              <PlusIcon className="w-4 h-4" />
              Добавить карту
            </button>
          </div>

          <div className="space-y-4">
            {cards.map((card) => (
              <div
                key={card.id}
                className="p-4 bg-(--bg-primary) rounded-lg border border-(--border-primary)"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{getCardIcon(card.type)}</span>
                    <div>
                      <div className="font-medium text-(--text-primary)">
                        {card.number}
                        {card.isDefault && (
                          <span className="ml-2 px-2 py-1 bg-green-500 text-white text-xs rounded-full">
                            Основная
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-(--text-secondary)">
                        {card.holder} • {card.expiry}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleCardDetails(card.id)}
                      className="p-2 text-(--text-secondary) hover:text-(--accent-primary) transition-colors"
                    >
                      {showCardDetails[card.id] ? (
                        <EyeSlashIcon className="w-4 h-4" />
                      ) : (
                        <EyeIcon className="w-4 h-4" />
                      )}
                    </button>
                    {!card.isDefault && (
                      <>
                        <button
                          onClick={() => setDefaultCard(card.id)}
                          className="p-2 text-(--text-secondary) hover:text-(--accent-primary) transition-colors"
                        >
                          <ArrowPathIcon className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteCard(card.id)}
                          className="p-2 text-(--text-secondary) hover:text-red-500 transition-colors"
                        >
                          <TrashIcon className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold text-(--text-primary)">
                    {formatBalance(card.balance, card.currency)}
                  </div>
                  {showCardDetails[card.id] && (
                    <div className="text-sm text-(--text-secondary)">
                      CVV: {card.cvv}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <WalletIcon className="w-6 h-6 text-(--accent-primary)" />
              <h2 className="text-xl font-semibold text-(--text-primary)">
                Электронные кошельки
              </h2>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-(--accent-primary) text-white rounded-lg hover:bg-(--accent-hover) transition-colors">
              <PlusIcon className="w-4 h-4" />
              Добавить кошелек
            </button>
          </div>

          <div className="space-y-4">
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                className="p-4 bg-(--bg-primary) rounded-lg border border-(--border-primary)"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {getWalletIcon(wallet.type)}
                    </span>
                    <div>
                      <div className="font-medium text-(--text-primary)">
                        {wallet.name}
                      </div>
                      <div className="text-sm text-(--text-secondary)">
                        {wallet.type.toUpperCase()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-semibold text-(--text-primary)">
                        {formatBalance(wallet.balance, wallet.currency)}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteWallet(wallet.id)}
                      className="p-2 text-(--text-secondary) hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <ArrowPathIcon className="w-6 h-6 text-(--accent-primary)" />
              <h2 className="text-xl font-semibold text-(--text-primary)">
                Автоплатежи
              </h2>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-(--accent-primary) text-white rounded-lg hover:bg-(--accent-hover) transition-colors">
              <PlusIcon className="w-4 h-4" />
              Добавить автоплатеж
            </button>
          </div>

          <div className="space-y-4">
            {autopayments.map((payment) => (
              <div
                key={payment.id}
                className="p-4 bg-(--bg-primary) rounded-lg border border-(--border-primary)"
              >
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-(--text-primary)">
                      {payment.name}
                    </div>
                    <div className="text-sm text-(--text-secondary)">
                      {payment.provider} • {payment.card}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleAutopayment(payment.id)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        payment.active
                          ? 'bg-(--accent-primary)'
                          : 'bg-(--border-primary)'
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          payment.active ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => deleteAutopayment(payment.id)}
                      className="p-2 text-(--text-secondary) hover:text-red-500 transition-colors"
                    >
                      <TrashIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="text-(--text-secondary)">
                    Следующий платеж:{' '}
                    {new Date(payment.nextPayment).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="font-medium text-(--text-primary)">
                    {formatBalance(payment.amount, 'RUB')}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <ChartBarIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              Лимиты операций
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-2">
                Суточный лимит
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={limits.daily}
                  onChange={(e) => updateLimit('daily', e.target.value)}
                  className="flex-1 p-3 bg-(--bg-primary) text-(--text-primary) border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary)"
                />
                <span className="text-(--text-secondary) whitespace-nowrap">
                  ₽ в день
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-2">
                Месячный лимит
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={limits.monthly}
                  onChange={(e) => updateLimit('monthly', e.target.value)}
                  className="flex-1 p-3 bg-(--bg-primary) text-(--text-primary) border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary)"
                />
                <span className="text-(--text-secondary) whitespace-nowrap">
                  ₽ в месяц
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-2">
                Лимит на одну операцию
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={limits.single}
                  onChange={(e) => updateLimit('single', e.target.value)}
                  className="flex-1 p-3 bg-(--bg-primary) text-(--text-primary) border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary)"
                />
                <span className="text-(--text-secondary) whitespace-nowrap">
                  ₽ за операцию
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-(--bg-secondary) rounded-2xl shadow-regular border border-(--border-primary) p-6">
          <div className="flex items-center gap-3 mb-6">
            <BanknotesIcon className="w-6 h-6 text-(--accent-primary)" />
            <h2 className="text-xl font-semibold text-(--text-primary)">
              История платежей
            </h2>
          </div>

          <div className="text-center py-8">
            <ClockIcon className="w-12 h-12 text-(--text-tertiary) mx-auto mb-4" />
            <div className="text-(--text-secondary)">
              История платежей временно недоступна
            </div>
            <button className="mt-4 px-4 py-2 text-(--accent-primary) border border-(--border-primary) rounded-lg hover:bg-(--bg-tertiary) transition-colors">
              Обновить
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
