import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import {
  getBankStyle,
  getBankIcon,
  formatBalance,
  getBankTotalBalance,
  declineAccount,
} from '@lib/utils/bank.utils'

export const BankHeader = ({
  bankItem,
  index,
  isExpanded,
  onToggle,
  onBankClick,
}) => {
  const style = getBankStyle(bankItem.name)
  const totalBalance = getBankTotalBalance(bankItem)

  const handleBankClick = (e) => {
    if (e.target.closest('button')) return

    if (window.innerWidth < 768) {
      onToggle(index)
    } else {
      onToggle(index)
    }
  }

  return (
    <div
      onClick={handleBankClick}
      className="bg-gradient-to-r rounded-2xl p-1 shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className={`${style.gradient} rounded-2xl p-1`}>
        <div className="bg-white rounded-xl p-4 md:p-5">
          <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-3 md:space-x-4 flex-1">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl bg-gradient-to-r ${style.gradient} text-white shadow-lg flex-shrink-0`}
              >
                {getBankIcon(bankItem.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-gray-900 text-lg md:text-xl truncate">
                  {bankItem.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1 flex-wrap gap-y-1">
                  <div
                    className={`px-2 py-1 rounded-full ${style.bg} ${style.text} text-xs font-medium`}
                  >
                    {bankItem.accounts.length}{' '}
                    {declineAccount(bankItem.accounts.length)}
                  </div>
                  <div className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block"></div>
                  <div className="text-gray-500 text-sm whitespace-nowrap">
                    {formatBalance(totalBalance)} ₽
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end space-x-3 md:space-x-4 mt-2 md:mt-0">
              {/* Общий баланс - с блюром если банк скрыт */}
              <div className="text-right md:mr-4">
                <p
                  className={`text-lg md:text-2xl font-bold whitespace-nowrap transition-all duration-300 text-gray-600 filter-none`}
                >
                  {formatBalance(totalBalance)} ₽
                </p>
                <p className="text-gray-400 text-xs hidden md:block">
                  Общий баланс
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle(index)
                }}
                className={`transform transition-transform duration-300 p-2 hover:bg-gray-100 rounded-lg ${
                  isExpanded ? 'rotate-180 bg-gray-100' : 'rotate-0'
                }`}
              >
                <ChevronDownIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
