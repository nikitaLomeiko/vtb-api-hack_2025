import { useTransaction } from '@store/transaction'
import React from 'react'

export const TransactionHistory = () => {
  const { transaction } = useTransaction()

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return (
      date.toLocaleDateString('ru-RU') +
      ' ' +
      date.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
      })
    )
  }

  const formatAmount = (amount, currency, indicator) => {
    const sign = indicator === 'Debit' ? '-' : '+'
    return `${sign} ${parseFloat(amount).toLocaleString('ru-RU')} ${currency}`
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">
          История транзакций
        </h2>
      </div>

      <div className="divide-y divide-gray-100">
        {transaction.tansactionList.length === 0 ? (
          <div className="px-6 py-8 text-center text-gray-500">
            Нет транзакций
          </div>
        ) : (
          transaction.tansactionList.map((trans) => (
            <div
              key={trans.transactionId}
              className="px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {trans.transactionInformation}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(trans.bookingDateTime)}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span
                      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        trans.status === 'Booked'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {trans.status === 'Booked' ? 'Проведена' : 'В обработке'}
                    </span>
                    <span className="text-xs text-gray-400">
                      {trans.bankTransactionCode.code}
                    </span>
                  </div>
                </div>

                <div
                  className={`text-right ${
                    trans.creditDebitIndicator === 'Debit'
                      ? 'text-red-600'
                      : 'text-green-600'
                  }`}
                >
                  <div className="font-semibold text-lg">
                    {formatAmount(
                      trans.amount.amount,
                      trans.amount.currency,
                      trans.creditDebitIndicator
                    )}
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {trans.accountId}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
