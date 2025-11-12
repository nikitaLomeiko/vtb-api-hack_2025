import { CreditCardIcon } from '@heroicons/react/24/outline'
import { formatBalance, declineAccount, getAccountsCount } from '@shared/utils'

export const BankBody = ({ bankItem, onBankClick }) => {
  const handleBankNavigation = (e) => {
    e.stopPropagation()
    onBankClick(bankItem)
  }

  const accounts = bankItem.accounts || []
  const accountsCount = getAccountsCount(bankItem)
  const bankName = bankItem.bank_name || bankItem.name

  return (
    <div className="mt-3">
      <div className="bg-(--bg-tertiary) rounded-2xl p-4 border border-(--border-primary)">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-(--text-primary) text-base md:text-lg">
            Счета банка
          </h4>
          <span className="text-(--text-secondary) text-sm">
            {accountsCount} {declineAccount(accountsCount)}
          </span>
        </div>

        <div className="space-y-3">
          {accounts.length > 0 ? (
            accounts.map((account, accIndex) => (
              <div
                key={account.id || accIndex}
                onClick={handleBankNavigation}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-(--bg-secondary) rounded-xl border border-(--border-primary)/50 hover:border-(--border-secondary) transition-colors cursor-pointer space-y-2 sm:space-y-0"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-(--bg-tertiary) to-(--bg-secondary) rounded-xl flex items-center justify-center border border-(--border-primary) shrink-0">
                    <CreditCardIcon className="w-4 h-4 md:w-6 md:h-6 text-(--text-secondary)" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-(--text-primary) text-base md:text-lg truncate">
                      {account.id
                        ? `•••• ${account.id.slice(-4)}`
                        : 'Новый счет'}
                    </p>
                    <p className="text-(--text-secondary) text-sm truncate">
                      {account.name || 'Основной счет'}
                    </p>
                  </div>
                </div>

                <div className="text-right sm:text-left sm:min-w-24">
                  <p className="text-lg md:text-xl font-bold text-(--text-primary) whitespace-nowrap">
                    {formatBalance(account.balance || 0)} ₽
                  </p>
                  <div className="flex items-center space-x-2 justify-end sm:justify-start mt-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <p className="text-(--text-tertiary) text-xs">активен</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-(--bg-secondary) rounded-full flex items-center justify-center mx-auto mb-3">
                <CreditCardIcon className="w-6 h-6 text-(--text-tertiary)" />
              </div>
              <p className="text-(--text-secondary) text-sm">
                Нет подключенных счетов
              </p>
              <p className="text-(--text-tertiary) text-xs mt-1">
                Счета появятся после синхронизации с банком
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 pt-4 border-t border-(--border-primary)">
          <button
            onClick={handleBankNavigation}
            className="flex-1 bg-(--accent-primary) hover:bg-(--accent-hover) text-white py-3 rounded-xl font-semibold transition-colors text-center text-sm md:text-base"
          >
            Управление счетами
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              console.log('Быстрый перевод для', bankName)
            }}
            className="flex-1 bg-(--bg-primary) border border-(--accent-primary) text-(--accent-primary) hover:bg-(--bg-tertiary) py-3 rounded-xl font-semibold transition-colors text-center text-sm md:text-base"
          >
            Быстрый перевод
          </button>
        </div>
      </div>
    </div>
  )
}
