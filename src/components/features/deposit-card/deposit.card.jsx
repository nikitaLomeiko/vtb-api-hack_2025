import React from 'react'
import {
  BanknotesIcon,
  CalendarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { formatBalance } from '@lib/utils/bank.utils'
import { useDepositStore } from '@store/deposit'

export const DepositCard = () => {
  const { selectedDeposit, setSelectedDeposit } = useDepositStore()

  if (!selectedDeposit) return null

  const {
    productName,
    description,
    interestRate,
    minAmount,
    maxAmount,
    termMonths,
  } = selectedDeposit

  const handleOpenDetails = () => {
    // Логика открытия деталей вклада
    console.log('Открыть детали вклада:', selectedDeposit.productId)
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      {/* Заголовок и ставка */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {productName}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-center ml-4">
          <div className="text-2xl font-bold text-green-700">
            {interestRate}%
          </div>
          <div className="text-green-600 text-xs font-medium">годовых</div>
        </div>
      </div>

      {/* Детали вклада */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <BanknotesIcon className="w-5 h-5 text-blue-600" />
          <div>
            <p className="text-sm text-gray-500">Сумма</p>
            <p className="font-semibold text-gray-900">
              {formatBalance(minAmount)} - {formatBalance(maxAmount)} ₽
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <CalendarIcon className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-sm text-gray-500">Срок</p>
            <p className="font-semibold text-gray-900">{termMonths} месяцев</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
          <ChartBarIcon className="w-5 h-5 text-orange-600" />
          <div>
            <p className="text-sm text-gray-500">Доход</p>
            <p className="font-semibold text-gray-900">
              ~{formatBalance((minAmount * interestRate) / 100)} ₽
            </p>
          </div>
        </div>
      </div>

      {/* Кнопка действия */}
      <button
        onClick={handleOpenDetails}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors text-center"
      >
        Открыть вклад
      </button>
    </div>
  )
}
