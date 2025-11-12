import {
  BanknotesIcon,
  CalendarIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline'
import { formatBalance } from '@shared/utils'
import { useDepositStore } from '@shared/store/deposit'

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
    console.log('Открыть детали вклада:', selectedDeposit.productId)
  }

  return (
    <div className="bg-(--bg-primary) rounded-2xl p-6 shadow-sm border border-(--border-primary) hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-(--text-primary) mb-2">
            {productName}
          </h3>
          <p className="text-(--text-secondary) text-sm leading-relaxed">
            {description}
          </p>
        </div>

        <div className="bg-(--bg-secondary) border border-(--border-primary) rounded-xl px-4 py-3 text-center ml-4">
          <div className="text-2xl font-bold text-(--text-primary)">
            {interestRate}%
          </div>
          <div className="text-(--text-secondary) text-xs font-medium">
            годовых
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="flex items-center space-x-3 p-3 bg-(--bg-secondary) rounded-lg">
          <BanknotesIcon className="w-5 h-5 text-(--accent-primary)" />
          <div>
            <p className="text-sm text-(--text-secondary)">Сумма</p>
            <p className="font-semibold text-(--text-primary)">
              {formatBalance(minAmount)} - {formatBalance(maxAmount)} ₽
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-(--bg-secondary) rounded-lg">
          <CalendarIcon className="w-5 h-5 text-(--accent-primary)" />
          <div>
            <p className="text-sm text-(--text-secondary)">Срок</p>
            <p className="font-semibold text-(--text-primary)">
              {termMonths} месяцев
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3 p-3 bg-(--bg-secondary) rounded-lg">
          <ChartBarIcon className="w-5 h-5 text-(--accent-primary)" />
          <div>
            <p className="text-sm text-(--text-secondary)">Доход</p>
            <p className="font-semibold text-(--text-primary)">
              ~{formatBalance((minAmount * interestRate) / 100)} ₽
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={handleOpenDetails}
        className="w-full bg-(--accent-primary) hover:bg-(--accent-hover) text-white py-3 rounded-xl font-semibold transition-colors text-center"
      >
        Открыть вклад
      </button>
    </div>
  )
}
