import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeftIcon,
  BanknotesIcon,
  CalendarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { useDepositStore } from '@store/deposit'
import { formatBalance } from '@lib/utils/bank.utils'

export const DepositDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { deposits } = useDepositStore()

  // Находим депозит по ID
  const deposit = deposits.find((d) => d.productId === id)

  if (!deposit) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Вклад не найден
            </h2>
            <button
              onClick={() => navigate('/deposit')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Вернуться к списку вкладов
            </button>
          </div>
        </div>
      </div>
    )
  }

  const {
    productName,
    description,
    interestRate,
    minAmount,
    maxAmount,
    termMonths,
  } = deposit

  const handleOpenDeposit = () => {
    console.log('Открытие вклада:', deposit.productId)
    // Здесь будет логика открытия вклада
  }

  return (
    <div className="min-h-screen relative bg-gray-50 py-4 md:py-8">
      <button
        onClick={() => navigate('/deposit')}
        className="hidden absolute left-5 top-8 lg:flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mr-4 md:mr-6 flex-shrink-0 mt-1"
      >
        <ArrowLeftIcon className="w-5 h-5" />
        <span className="hidden sm:inline">Назад</span>
      </button>
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Хедер с кнопкой назад */}
        <div className="flex items-start mb-6 md:mb-8">
          <button
            onClick={() => navigate('/deposit')}
            className="lg:hidden flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mr-4 md:mr-6 flex-shrink-0 mt-1"
          >
            <ArrowLeftIcon className="w-5 h-5" />
            <span className="hidden sm:inline">Назад</span>
          </button>
          <div className="ml-4 flex-1 min-w-0">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 break-words">
              {productName}
            </h1>
            <p className="text-gray-600 mt-1 md:mt-2 text-sm md:text-base">
              Детальная информация о вкладе
            </p>
          </div>
        </div>

        {/* Основная информация */}
        <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-start justify-between mb-6 space-y-4 lg:space-y-0">
            <div className="flex-1">
              <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                {description}
              </p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 md:px-6 md:py-4 text-center lg:ml-6 flex-shrink-0 w-full lg:w-auto">
              <div className="text-2xl md:text-3xl font-bold text-green-700">
                {interestRate}%
              </div>
              <div className="text-green-600 text-xs md:text-sm font-medium">
                годовых
              </div>
            </div>
          </div>

          {/* Детали вклада */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-blue-50 rounded-xl">
              <BanknotesIcon className="w-6 h-6 md:w-8 md:h-8 text-blue-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-blue-600 font-medium">
                  Сумма вклада
                </p>
                <p className="font-bold text-gray-900 text-base md:text-lg truncate">
                  {formatBalance(minAmount)} - {formatBalance(maxAmount)} ₽
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-purple-50 rounded-xl">
              <CalendarIcon className="w-6 h-6 md:w-8 md:h-8 text-purple-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-purple-600 font-medium">
                  Срок
                </p>
                <p className="font-bold text-gray-900 text-base md:text-lg">
                  {termMonths} месяцев
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3 md:space-x-4 p-3 md:p-4 bg-orange-50 rounded-xl">
              <ChartBarIcon className="w-6 h-6 md:w-8 md:h-8 text-orange-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-orange-600 font-medium">
                  Примерный доход
                </p>
                <p className="font-bold text-gray-900 text-base md:text-lg truncate">
                  ~{formatBalance((minAmount * interestRate) / 100)} ₽
                </p>
              </div>
            </div>
          </div>

          {/* Кнопка открытия вклада */}
          <button
            onClick={handleOpenDeposit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 md:py-4 rounded-xl font-semibold text-base md:text-lg transition-colors"
          >
            Открыть вклад
          </button>
        </div>

        {/* Дополнительная информация */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-blue-50 rounded-2xl p-4 md:p-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-3 md:mb-4 text-base md:text-lg">
              Условия вклада
            </h3>
            <ul className="text-blue-800 space-y-2 md:space-y-3 text-sm md:text-base">
              <li className="flex items-start space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="break-words">Пополнение: доступно</span>
              </li>
              <li className="flex items-start space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="break-words">
                  Частичное снятие: не доступно
                </span>
              </li>
              <li className="flex items-start space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="break-words">Капитализация: ежемесячно</span>
              </li>
            </ul>
          </div>

          <div className="bg-green-50 rounded-2xl p-4 md:p-6 border border-green-200">
            <h3 className="font-bold text-green-900 mb-3 md:mb-4 text-base md:text-lg">
              Преимущества
            </h3>
            <ul className="text-green-800 space-y-2 md:space-y-3 text-sm md:text-base">
              <li className="flex items-start space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="break-words">Высокая процентная ставка</span>
              </li>
              <li className="flex items-start space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="break-words">Гарантия возврата средств</span>
              </li>
              <li className="flex items-start space-x-2 md:space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span className="break-words">
                  Удобное управление через приложение
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
