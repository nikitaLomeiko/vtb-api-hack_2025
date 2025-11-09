import React, { useState, useMemo } from 'react'
import { BuildingLibraryIcon } from '@heroicons/react/24/outline'
import { useAddBank, useBanks } from './api'

export const AddBankForm = ({ onSuccess, onCancel }) => {
  const { data: banksResponse, isLoading, error } = useBanks()
  const addBankMutation = useAddBank()

  const [formData, setFormData] = useState({
    bankId: '',
    clientId: '',
  })

  const [showBankSuggestions, setShowBankSuggestions] = useState(false)

  // Обрабатываем разные форматы ответа
  const availableBanks = useMemo(() => {
    if (!banksResponse) return []

    // Если ответ уже массив
    if (Array.isArray(banksResponse)) {
      return banksResponse
    }

    // Если ответ объект с данными
    if (banksResponse.data && Array.isArray(banksResponse.data)) {
      return banksResponse.data
    }

    // Если ответ объект с другим форматом
    if (typeof banksResponse === 'object') {
      return Object.values(banksResponse).filter(
        (item) => item && typeof item === 'object' && item.bank_id
      )
    }

    return []
  }, [banksResponse])

  const filteredBanks = useMemo(() => {
    if (!formData.bankId) return availableBanks

    return availableBanks.filter((bank) => {
      if (!bank || typeof bank !== 'object') return false

      const bankName = bank.bank_name || bank.name || ''
      const bankDescription = bank.bank_description || bank.description || ''

      return (
        bankName.toLowerCase().includes(formData.bankId.toLowerCase()) ||
        bankDescription.toLowerCase().includes(formData.bankId.toLowerCase())
      )
    })
  }, [formData.bankId, availableBanks])

  const selectedBank = useMemo(() => {
    return availableBanks.find((bank) => {
      if (!bank || typeof bank !== 'object') return false
      return bank.bank_id === formData.bankId
    })
  }, [formData.bankId, availableBanks])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedBank) {
      alert('Пожалуйста, выберите банк')
      return
    }

    if (!formData.clientId) {
      alert('Пожалуйста, укажите client_id')
      return
    }

    try {
      await addBankMutation.mutateAsync({
        bank_id: selectedBank.bank_id,
        client_id: formData.clientId,
      })

      onSuccess?.()
    } catch (error) {
      alert('Ошибка при добавлении банка')
    }
  }

  const handleBankSelect = (bank) => {
    if (bank && bank.bank_id) {
      setFormData((prev) => ({ ...prev, bankId: bank.bank_id }))
      setShowBankSuggestions(false)
    }
  }

  const handleBankChange = (value) => {
    setFormData((prev) => ({ ...prev, bankId: value }))
    setShowBankSuggestions(true)
  }

  // if (isLoading) {
  //   return (
  //     <div className="p-6">
  //       <div className="">
  //         <div className="h-4 bg-(--bg-secondary) rounded w-1/3 mb-4"></div>
  //         <div className="h-10 bg-(--bg-secondary) rounded mb-4"></div>
  //         <div className="h-10 bg-(--bg-secondary) rounded mb-4"></div>
  //         <div className="h-12 bg-(--bg-secondary) rounded"></div>
  //       </div>
  //     </div>
  //   )
  // }

  // if (error) {
  //   return (
  //     <div className="p-6 text-center">
  //       <p className="text-red-600 mb-4">Ошибка при загрузке банков</p>
  //       <button
  //         onClick={() => window.location.reload()}
  //         className="text-(--accent-primary) hover:text-(--accent-hover) font-medium"
  //       >
  //         Попробовать снова
  //       </button>
  //     </div>
  //   )
  // }

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label className="block text-sm font-medium text-(--text-primary) mb-2">
            Выберите банк *
          </label>
          <div className="relative">
            <input
              type="text"
              required
              value={formData.bankId}
              onChange={(e) => handleBankChange(e.target.value)}
              onFocus={() => setShowBankSuggestions(true)}
              onBlur={() =>
                setTimeout(() => setShowBankSuggestions(false), 200)
              }
              className="w-full px-4 py-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary)"
              placeholder="Введите название банка"
            />

            {showBankSuggestions && filteredBanks.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-(--bg-primary) border border-(--border-primary) rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredBanks.map((bank) => (
                  <div
                    key={bank.bank_id}
                    onClick={() => handleBankSelect(bank)}
                    className="p-3 hover:bg-(--bg-secondary) cursor-pointer border-b border-(--border-primary) last:border-b-0"
                  >
                    <div className="flex items-center space-x-3">
                      {bank.bank_avatar ? (
                        <img
                          src={bank.bank_avatar}
                          alt={bank.bank_name || bank.name}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                      ) : (
                        <div className="w-8 h-8 bg-(--bg-secondary) rounded-full flex items-center justify-center flex-shrink-0">
                          <BuildingLibraryIcon className="w-4 h-4 text-(--accent-primary)" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-(--text-primary) truncate">
                          {bank.bank_name || bank.name || 'Неизвестный банк'}
                        </div>
                        <div className="text-sm text-(--text-secondary) truncate">
                          {bank.bank_description || bank.description || ''}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedBank && (
            <div className="mt-2 p-3 bg-(--bg-secondary) rounded-lg border border-(--border-primary)">
              <div className="flex items-center space-x-3">
                {selectedBank.bank_avatar && (
                  <img
                    src={selectedBank.bank_avatar}
                    alt={selectedBank.bank_name || selectedBank.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div>
                  <div className="font-semibold text-(--text-primary)">
                    {selectedBank.bank_name || selectedBank.name}
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    {selectedBank.bank_description ||
                      selectedBank.description ||
                      ''}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-(--text-primary) mb-2">
            Client ID *
          </label>
          <input
            type="text"
            required
            value={formData.clientId}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, clientId: e.target.value }))
            }
            className="w-full px-4 py-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary)"
            placeholder="Введите ваш client_id"
          />
          <p className="text-sm text-(--text-secondary) mt-2">
            Уникальный идентификатор для подключения к банку
          </p>
        </div>

        <div className="flex space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-(--bg-secondary) hover:bg-(--bg-tertiary) text-(--text-primary) py-3 rounded-xl font-semibold transition-colors"
          >
            Отмена
          </button>
          <button
            type="submit"
            disabled={
              addBankMutation.isPending || !selectedBank || !formData.clientId
            }
            className="flex-1 bg-(--accent-primary) hover:bg-(--accent-hover) disabled:bg-(--text-tertiary) disabled:cursor-not-allowed text-white py-3 rounded-xl font-semibold transition-colors"
          >
            {addBankMutation.isPending ? 'Добавление...' : 'Добавить банк'}
          </button>
        </div>
      </form>
    </div>
  )
}
