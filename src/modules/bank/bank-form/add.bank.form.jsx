import { useState, useMemo } from 'react'
import { BuildingLibraryIcon, CheckIcon } from '@heroicons/react/24/outline'
import { useAddBank, useBanks } from './api'
import { useAuthUser } from '@shared/store/auth'
import { useUserBanks } from '../bank.list'

export const AddBankForm = ({ onSuccess, onCancel }) => {
  const { user } = useAuthUser()
  const { data: banksResponse, isLoading, error } = useBanks()
  const { data: userBanks } = useUserBanks(user.uncrypted_token)
  const addBankMutation = useAddBank()

  const [formData, setFormData] = useState({
    bankId: '',
    clientId: 'team074-5',
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

  // Получаем ID уже добавленных банков
  const addedBankIds = useMemo(() => {
    if (!userBanks || !Array.isArray(userBanks)) return []

    return userBanks.map((bank) => bank.bank_id?.toString())
  }, [userBanks])

  // Фильтруем банки: убираем уже добавленные
  const availableBanksFiltered = useMemo(() => {
    return availableBanks.filter((bank) => {
      const bankId = bank.bank_id?.toString()
      return !addedBankIds.includes(bankId)
    })
  }, [availableBanks, addedBankIds])

  // Банки для поиска (только доступные)
  const filteredBanks = useMemo(() => {
    if (!formData.bankId) return availableBanksFiltered

    return availableBanksFiltered.filter((bank) => {
      if (!bank || typeof bank !== 'object') return false

      const bankName = bank.bank_name || bank.name || ''
      const bankDescription = bank.bank_description || bank.description || ''
      const bankIdString = bank.bank_id?.toString() || ''

      return (
        bankName.toLowerCase().includes(formData.bankId.toLowerCase()) ||
        bankDescription.toLowerCase().includes(formData.bankId.toLowerCase()) ||
        bankIdString.includes(formData.bankId)
      )
    })
  }, [formData.bankId, availableBanksFiltered])

  const selectedBank = useMemo(() => {
    return availableBanks.find((bank) => {
      if (!bank || typeof bank !== 'object') return false
      return bank.bank_id?.toString() === formData.bankId
    })
  }, [formData.bankId, availableBanks])

  // Проверяем, выбран ли уже добавленный банк
  const isBankAlreadyAdded = useMemo(() => {
    if (!selectedBank) return false
    return addedBankIds.includes(selectedBank.bank_id?.toString())
  }, [selectedBank, addedBankIds])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedBank) {
      alert('Пожалуйста, выберите банк')
      return
    }

    if (isBankAlreadyAdded) {
      alert('Этот банк уже добавлен')
      return
    }

    if (!formData.clientId) {
      alert('Пожалуйста, укажите client_id')
      return
    }

    try {
      await addBankMutation.mutateAsync({
        bank_id: Number(selectedBank.bank_id),
        client_id: formData.clientId,
        token: user.uncrypted_token,
      })

      onSuccess?.()
    } catch (error) {
      alert('Ошибка при добавлении банка')
    }
  }

  const handleBankSelect = (bank) => {
    if (bank && bank.bank_id) {
      const bankId = bank.bank_id.toString()
      // Проверяем, не добавлен ли уже этот банк
      if (!addedBankIds.includes(bankId)) {
        setFormData((prev) => ({ ...prev, bankId }))
        setShowBankSuggestions(false)
      }
    }
  }

  const handleBankChange = (value) => {
    setFormData((prev) => ({ ...prev, bankId: value }))
    setShowBankSuggestions(true)
  }

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
              placeholder="Введите название банка или ID"
            />

            {showBankSuggestions && filteredBanks.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-(--bg-primary) border border-(--border-primary) rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {filteredBanks.map((bank) => {
                  const isAdded = addedBankIds.includes(
                    bank.bank_id?.toString()
                  )

                  return (
                    <div
                      key={bank.bank_id}
                      onClick={() => !isAdded && handleBankSelect(bank)}
                      className={`p-3 border-b border-(--border-primary) last:border-b-0 ${
                        isAdded
                          ? 'bg-(--bg-secondary) cursor-not-allowed opacity-50'
                          : 'hover:bg-(--bg-secondary) cursor-pointer'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        {bank.bank_avatar ? (
                          <img
                            src={bank.bank_avatar}
                            alt={bank.bank_name || bank.name}
                            className="w-8 h-8 rounded-full shrink-0"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-(--bg-secondary) rounded-full flex items-center justify-center shrink-0">
                            <BuildingLibraryIcon className="w-4 h-4 text-(--accent-primary)" />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-(--text-primary) truncate">
                            {bank.bank_name || bank.name || 'Неизвестный банк'}
                            {isAdded && (
                              <span className="ml-2 text-green-600 text-xs font-normal">
                                (уже добавлен)
                              </span>
                            )}
                          </div>
                          <div className="text-sm text-(--text-secondary) truncate">
                            ID: {bank.bank_id} •{' '}
                            {bank.bank_description || bank.description || ''}
                          </div>
                        </div>
                        {isAdded && (
                          <div className="shrink-0">
                            <CheckIcon className="w-5 h-5 text-green-600" />
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {showBankSuggestions &&
              filteredBanks.length === 0 &&
              formData.bankId && (
                <div className="absolute z-10 w-full mt-1 bg-(--bg-primary) border border-(--border-primary) rounded-lg shadow-lg p-4">
                  <p className="text-(--text-secondary) text-sm text-center">
                    {availableBanksFiltered.length === 0
                      ? 'Все доступные банки уже добавлены'
                      : 'Банк не найден'}
                  </p>
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
                <div className="flex-1">
                  <div className="font-semibold text-(--text-primary)">
                    {selectedBank.bank_name || selectedBank.name}
                    {isBankAlreadyAdded && (
                      <span className="ml-2 text-red-600 text-sm font-normal">
                        (уже добавлен)
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-(--text-secondary)">
                    ID: {selectedBank.bank_id} •{' '}
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
              addBankMutation.isPending ||
              !selectedBank ||
              !formData.clientId ||
              isBankAlreadyAdded
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
