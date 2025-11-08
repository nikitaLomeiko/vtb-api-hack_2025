import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { DepositList } from '@components/widgets/deposit.list'

export const Deposit = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 py-8 flex items-start">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Хедер */}
        <div className="flex items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Вклады и инвестиции
            </h1>
            <p className="text-gray-600 mt-2">
              Выгодные предложения по вкладам от проверенных банков
            </p>
          </div>
        </div>

        {/* Основной контент */}
        <DepositList />

        {/* Дополнительная информация */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-50 rounded-2xl p-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">
              Почему выбирают вклады?
            </h3>
            <ul className="text-blue-800 text-sm space-y-2">
              <li>• Гарантированная доходность</li>
              <li>• Защита средств</li>
              <li>• Простые условия</li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
            <h3 className="font-bold text-green-900 mb-2">
              На что обратить внимание?
            </h3>
            <ul className="text-green-800 text-sm space-y-2">
              <li>• Процентная ставка</li>
              <li>• Срок размещения</li>
              <li>• Условия досрочного снятия</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
