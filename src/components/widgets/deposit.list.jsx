import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { Link } from 'react-router-dom'
import { formatBalance } from '@lib/utils/bank.utils'
import { useDepositStore } from '@store/deposit'
import { useDeposits } from '@lib/hooks/use.deposits'
import { DeleteDepositButton } from '@components/features/deposit/delete-deposit'

export const DepositList = () => {
  const { deposits, isLoading, error } = useDeposits()
  const { userDeposits } = useDepositStore()

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-20 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="text-center text-red-600">
          <p>{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-gray-900">
            Вклады
          </h2>
          <p className="text-gray-500 text-sm">
            {userDeposits.length} моих вкладов • {deposits.length} предложений
          </p>
        </div>
        <Link
          to="/deposit/create"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Открыть вклад</span>
        </Link>
      </div>

      {userDeposits.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Мои вклады
          </h3>
          <div className="space-y-4">
            {userDeposits.map((deposit) => (
              <div
                key={deposit.id}
                className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-bold text-gray-900 text-lg">
                        {deposit.productName}
                      </h4>
                      <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
                        Активен
                      </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Сумма:</span>
                        <span className="font-semibold text-gray-900 ml-2">
                          {formatBalance(deposit.currentAmount)} ₽
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Ставка:</span>
                        <span className="font-semibold text-gray-900 ml-2">
                          {deposit.interestRate}%
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-500">Срок:</span>
                        <span className="font-semibold text-gray-900 ml-2">
                          {deposit.termMonths} мес
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="ml-4">
                    <DeleteDepositButton
                      depositId={deposit.id}
                      depositName={deposit.productName}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Доступные предложения
        </h3>
        <div className="space-y-4">
          {deposits.map((deposit) => (
            <Link
              key={deposit.productId}
              to={`/deposit/${deposit.productId}`}
              className="block bg-gray-50 rounded-2xl p-5 border border-gray-200 hover:border-blue-300 hover:shadow-sm transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 text-lg mb-1">
                    {deposit.productName}
                  </h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {deposit.description}
                  </p>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                      {deposit.interestRate}% годовых
                    </span>
                    <span className="text-gray-500">
                      {deposit.termMonths} мес
                    </span>
                    <span className="text-gray-500">
                      от {formatBalance(deposit.minAmount)} ₽
                    </span>
                  </div>
                </div>

                <div className="text-right ml-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {deposit.interestRate}%
                  </div>
                  <div className="text-gray-500 text-xs">ставка</div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {deposits.length === 0 && !isLoading && (
        <div className="text-center py-8">
          <div className="text-gray-400 text-lg mb-2">
            Нет доступных вкладов
          </div>
          <p className="text-gray-500 text-sm">
            В данный момент нет предложений по вкладам
          </p>
        </div>
      )}
    </div>
  )
}
