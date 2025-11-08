import React, { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/outline'
import { useBank } from '@store/bank'
import { useContactStore } from '@store/contact'
import { useTransaction } from '@store/transaction'
import { formatBalance } from '@lib/utils/bank.utils'

export const TransactionForm = ({ isComponent }) => {
  const navigate = useNavigate()
  const { bank, subtractMoney } = useBank()
  const { contacts, addRecentTransaction } = useContactStore()
  const { transaction } = useTransaction()

  const [formData, setFormData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    contactId: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showFromSuggestions, setShowFromSuggestions] = useState(false)
  const [showToSuggestions, setShowToSuggestions] = useState(false)

  const allAccounts = useMemo(() => {
    return bank.bankList.flatMap((bank) =>
      bank.accounts.map((account) => ({
        ...account,
        bankName: bank.name,
      }))
    )
  }, [bank.bankList])

  const filteredFromAccounts = useMemo(() => {
    if (!formData.fromAccount) return []
    return allAccounts.filter(
      (account) =>
        account.id.includes(formData.fromAccount) ||
        account.name.toLowerCase().includes(formData.fromAccount.toLowerCase())
    )
  }, [formData.fromAccount, allAccounts])

  const filteredToContacts = useMemo(() => {
    if (!formData.toAccount) return []
    return contacts.filter(
      (contact) =>
        contact.account.includes(formData.toAccount) ||
        contact.name.toLowerCase().includes(formData.toAccount.toLowerCase())
    )
  }, [formData.toAccount, contacts])

  const selectedFromAccount = allAccounts.find(
    (acc) => acc.id === formData.fromAccount
  )

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedFromAccount) {
      alert('Пожалуйста, выберите счет списания')
      return
    }

    if (!formData.toAccount) {
      alert('Пожалуйста, укажите счет получателя')
      return
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      alert('Пожалуйста, укажите корректную сумму')
      return
    }

    const amount = parseFloat(formData.amount)

    if (amount > selectedFromAccount.balance) {
      alert('Недостаточно средств на счете')
      return
    }

    setIsSubmitting(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500))

      subtractMoney(amount)

      const selectedContact = contacts.find(
        (contact) => contact.id === formData.contactId
      )

      addRecentTransaction({
        id: `transaction_${Date.now()}`,
        fromAccount: selectedFromAccount.id,
        toAccount: formData.toAccount,
        amount: amount,
        date: new Date().toISOString(),
        status: 'completed',
        recipientName: selectedContact?.name || 'Неизвестный получатель',
      })

      alert('Транзакция выполнена успешно!')
      navigate('/')
    } catch (error) {
      alert('Ошибка при выполнении транзакции')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleFromAccountSelect = (account) => {
    setFormData((prev) => ({ ...prev, fromAccount: account.id }))
    setShowFromSuggestions(false)
  }

  const handleToAccountSelect = (contact) => {
    setFormData((prev) => ({
      ...prev,
      toAccount: contact.account,
      contactId: contact.id,
    }))
    setShowToSuggestions(false)
  }

  const handleFromAccountChange = (value) => {
    setFormData((prev) => ({ ...prev, fromAccount: value }))
    setShowFromSuggestions(true)
  }

  const handleToAccountChange = (value) => {
    setFormData((prev) => ({ ...prev, toAccount: value, contactId: '' }))
    setShowToSuggestions(true)
  }

  return (
    <div
      className={`${
        !isComponent ?? 'min-h-[calc(100vh-72px)]'
      } relative bg-gray-50 py-8`}
    >
      <button
        onClick={() => navigate('/')}
        className={`${
          isComponent ?? 'md:hidden'
        } hidden absolute left-5 top-8 md:flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mr-6`}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Назад</span>
      </button>
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="md:ml-8 flex items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className={`${
              isComponent ?? 'hidden'
            } md:hidden flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mr-6`}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Назад</span>
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Перевод средств
            </h1>
            <p className="text-gray-600 mt-2">
              Быстрый и безопасный перевод между счетами
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Счет списания *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.fromAccount}
                  onChange={(e) => handleFromAccountChange(e.target.value)}
                  onFocus={() => setShowFromSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowFromSuggestions(false), 200)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите номер счета или название"
                />

                {showFromSuggestions && filteredFromAccounts.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredFromAccounts.map((account) => (
                      <div
                        key={account.id}
                        onClick={() => handleFromAccountSelect(account)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              {account.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {account.id} • {account.bankName}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">
                              {formatBalance(account.balance)} ₽
                            </div>
                            <div className="text-xs text-gray-500">
                              доступно
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {selectedFromAccount && (
                <div className="mt-2 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-blue-700">Доступно:</span>
                    <span className="font-semibold text-blue-900">
                      {formatBalance(selectedFromAccount.balance)} ₽
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Счет получателя *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={formData.toAccount}
                  onChange={(e) => handleToAccountChange(e.target.value)}
                  onFocus={() => setShowToSuggestions(true)}
                  onBlur={() =>
                    setTimeout(() => setShowToSuggestions(false), 200)
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите номер счета, имя или телефон"
                />

                {showToSuggestions && filteredToContacts.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredToContacts.map((contact) => (
                      <div
                        key={contact.id}
                        onClick={() => handleToAccountSelect(contact)}
                        className="p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <UserIcon className="w-4 h-4 text-blue-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">
                              {contact.name}
                            </div>
                            <div className="text-sm text-gray-500 truncate">
                              {contact.account}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Сумма перевода *
              </label>
              <div className="relative">
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0.00"
                  min="1"
                  max={selectedFromAccount?.balance || 0}
                  step="0.01"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₽
                </div>
              </div>

              {selectedFromAccount && formData.amount && (
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-gray-500">Останется на счете:</span>
                  <span
                    className={`font-semibold ${
                      parseFloat(formData.amount) > selectedFromAccount.balance
                        ? 'text-red-600'
                        : 'text-gray-900'
                    }`}
                  >
                    {formatBalance(
                      selectedFromAccount.balance - parseFloat(formData.amount)
                    )}{' '}
                    ₽
                  </span>
                </div>
              )}
            </div>

            {selectedFromAccount && (
              <div className="grid grid-cols-4 gap-2">
                {[1000, 5000, 10000, 50000].map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, amount: amount.toString() })
                    }
                    className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition-colors"
                  >
                    {formatBalance(amount)}
                  </button>
                ))}
              </div>
            )}

            <button
              type="submit"
              disabled={
                isSubmitting ||
                !selectedFromAccount ||
                !formData.toAccount ||
                !formData.amount
              }
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              {isSubmitting ? 'Перевод...' : 'Перевести'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
