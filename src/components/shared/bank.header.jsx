import React from 'react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import {
  getBankStyle,
  getBankIcon,
  formatBalance,
  getBankTotalBalance,
  declineAccount,
  getAccountsCount,
} from '@lib/utils/bank.utils'

export const BankHeader = ({
  bankItem,
  index,
  isExpanded,
  onToggle,
  onBankClick,
}) => {
  const style = getBankStyle(bankItem.bank_name || bankItem.name)
  const totalBalance = getBankTotalBalance(bankItem)
  const accountsCount = getAccountsCount(bankItem)

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
      className="rounded-2xl shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
    >
      <div className={`${style.gradient} rounded-2xl p-1`}>
        <div className="bg-(--bg-tertiary) rounded-xl p-4 md:p-5">
          <div className="flex flex-col space-y-3 md:flex-row md:items-center md:justify-between md:space-y-0">
            <div className="flex items-center space-x-3 md:space-x-4 flex-1">
              <div
                className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center text-xl md:text-2xl bg-gradient-to-r ${style.gradient} text-white shadow-lg flex-shrink-0`}
              >
                {getBankIcon(bankItem.bank_name || bankItem.name)}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-(--text-primary) text-lg md:text-xl truncate">
                  {bankItem.bank_name || bankItem.name}
                </h3>
                <div className="flex items-center space-x-2 mt-1 flex-wrap gap-y-1">
                  <div
                    className={`px-2 py-1 rounded-full ${style.bg} ${style.text} text-xs font-medium`}
                  >
                    {accountsCount} {declineAccount(accountsCount)}
                  </div>
                  <div className="w-1 h-1 bg-(--border-primary) rounded-full hidden sm:block"></div>
                  <div className="text-(--text-secondary) text-sm whitespace-nowrap">
                    {formatBalance(totalBalance)} ₽
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end space-x-3 md:space-x-4 mt-2 md:mt-0">
              <div className="text-right md:mr-4">
                <p
                  className={`text-lg md:text-2xl font-bold whitespace-nowrap transition-all duration-300 text-(--text-primary) filter-none`}
                >
                  {formatBalance(totalBalance)} ₽
                </p>
                <p className="text-(--text-tertiary) text-xs hidden md:block">
                  Общий баланс
                </p>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onToggle(index)
                }}
                className={`transform transition-transform duration-300 p-2 hover:bg-(--bg-tertiary) rounded-lg ${
                  isExpanded ? 'rotate-180 bg-(--bg-tertiary)' : 'rotate-0'
                }`}
              >
                <ChevronDownIcon className="w-5 h-5 md:w-6 md:h-6 text-(--text-secondary)" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
