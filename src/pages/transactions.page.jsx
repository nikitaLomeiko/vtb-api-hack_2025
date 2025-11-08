import { TransactionHistory } from '@components/widgets/transaction.history'
import { StatsPanel } from '@components/widgets/stats.panel'
import {
  TransactionFilter,
  ActiveFilters,
} from '@components/features/transaction-filter'
import { useTransaction } from '@store/transaction'
import { TransactionForm } from '@components/features/transactions'

export const TransactionsPage = () => {
  const { transaction } = useTransaction()

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <TransactionForm iIsComponent />
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[--text-primary] mb-2">
            История транзакций
          </h1>
          <p className="text-lg text-[var(--text-secondary)]">
            Все ваши финансовые операции в одном месте
          </p>
        </div>

        <StatsPanel />

        <TransactionFilter />

        {transaction.isFiltersExpanded && <ActiveFilters />}

        <div className="bg-[var(--bg-primary)] rounded-2xl shadow-sm border border-[var(--border-primary)] overflow-hidden">
          <TransactionHistory />
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-[var(--text-tertiary)]">
            Показано {transaction.tansactionList.length} транзакций • Обновлено
            сегодня
          </p>
        </div>
      </div>
    </div>
  )
}
