import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeftIcon, UserIcon } from '@heroicons/react/24/outline'
import { useContactStore } from '@shared/store/contact'
import { useTransaction } from '@shared/store/transaction'
import { formatBalance } from '@shared/utils'
import { useBank } from '@shared/store/bank'

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
    const banks = bank.banks || bank.bankList || []
    return banks.flatMap((bankItem) =>
      (bankItem.accounts || []).map((account) => ({
        ...account,
        bankName: bankItem.bank_name || bankItem.name,
      }))
    )
  }, [bank.banks, bank.bankList])

  const filteredFromAccounts = useMemo(() => {
    if (!formData.fromAccount) return []
    return allAccounts.filter(
      (account) =>
        account.id?.includes(formData.fromAccount) ||
        account.name?.toLowerCase().includes(formData.fromAccount.toLowerCase())
    )
  }, [formData.fromAccount, allAccounts])

  const filteredToContacts = useMemo(() => {
    if (!formData.toAccount) return []
    return contacts.filter(
      (contact) =>
        contact.account?.includes(formData.toAccount) ||
        contact.name?.toLowerCase().includes(formData.toAccount.toLowerCase())
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
    <div className="relative bg-(--bg-primary) py-8">
      <button
        onClick={() => navigate('/')}
        className={`${
          isComponent ?? 'md:hidden'
        } hidden absolute left-5 top-8 md:flex items-center space-x-2 text-(--text-secondary) hover:text-(--text-primary) transition-colors mr-6`}
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span>Назад</span>
      </button>
      <div className="mx-auto max-w-6xl">
        <div className="md:ml-8 flex items-center mb-8">
          <button
            onClick={() => navigate('/')}
            className={`${
              isComponent ?? 'hidden'
            } md:hidden flex items-center space-x-2 text-(--text-secondary) hover:text-(--text-primary) transition-colors mr-6`}
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span>Назад</span>
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-(--text-primary)">
              Перевод средств
            </h1>
            <p className="text-(--text-secondary) mt-2">
              Быстрый и безопасный перевод между счетами
            </p>
          </div>
        </div>

        <div className="bg-(--bg-primary) rounded-2xl p-6 shadow-sm border border-(--border-primary)">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-medium text-(--text-primary) mb-2">
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
                  className="w-full px-4 py-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary)"
                  placeholder="Введите номер счета или название"
                />

                {showFromSuggestions && filteredFromAccounts.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-(--bg-primary) border border-(--border-primary) rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredFromAccounts.map((account) => (
                      <div
                        key={account.id}
                        onClick={() => handleFromAccountSelect(account)}
                        className="p-3 hover:bg-(--bg-secondary) cursor-pointer border-b border-(--border-primary) last:border-b-0"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-(--text-primary)">
                              {account.name || 'Без названия'}
                            </div>
                            <div className="text-sm text-(--text-secondary)">
                              {account.id
                                ? `•••• ${account.id.slice(-4)}`
                                : 'Новый счет'}{' '}
                              • {account.bankName}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-(--text-primary)">
                              {formatBalance(account.balance || 0)} ₽
                            </div>
                            <div className="text-xs text-(--text-tertiary)">
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
                <div className="mt-2 p-3 bg-(--bg-secondary) rounded-lg border border-(--border-primary)">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-(--text-secondary)">Доступно:</span>
                    <span className="font-semibold text-(--text-primary)">
                      {formatBalance(selectedFromAccount.balance || 0)} ₽
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-(--text-primary) mb-2">
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
                  className="w-full px-4 py-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary)"
                  placeholder="Введите номер счета, имя или телефон"
                />

                {showToSuggestions && filteredToContacts.length > 0 && (
                  <div className="absolute z-10 w-full mt-1 bg-(--bg-primary) border border-(--border-primary) rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {filteredToContacts.map((contact) => (
                      <div
                        key={contact.id}
                        onClick={() => handleToAccountSelect(contact)}
                        className="p-3 hover:bg-(--bg-secondary) cursor-pointer border-b border-(--border-primary) last:border-b-0"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-(--bg-secondary) rounded-full flex items-center justify-center shrink-0">
                            <UserIcon className="w-4 h-4 text-(--accent-primary)" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-(--text-primary) truncate">
                              {contact.name}
                            </div>
                            <div className="text-sm text-(--text-secondary) truncate">
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
              <label className="block text-sm font-medium text-(--text-primary) mb-2">
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
                  className="w-full px-4 py-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary)"
                  placeholder="0.00"
                  min="1"
                  max={selectedFromAccount?.balance || 0}
                  step="0.01"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-(--text-secondary)">
                  ₽
                </div>
              </div>

              {selectedFromAccount && formData.amount && (
                <div className="mt-2 flex items-center justify-between text-sm">
                  <span className="text-(--text-secondary)">
                    Останется на счете:
                  </span>
                  <span
                    className={`font-semibold ${
                      parseFloat(formData.amount) > selectedFromAccount.balance
                        ? 'text-red-600'
                        : 'text-(--text-primary)'
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
                    className="px-3 py-2 bg-(--bg-secondary) hover:bg-(--bg-tertiary) text-(--text-primary) rounded-lg text-sm font-medium transition-colors"
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
              className="w-full bg-(--accent-primary) hover:bg-(--accent-hover) disabled:bg-(--text-tertiary) disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              {isSubmitting ? 'Перевод...' : 'Перевести'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
