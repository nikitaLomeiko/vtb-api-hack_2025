import { TransactionForm } from '@modules/transactions'
import { useAuthUser } from '@shared/store/auth'
import { useTransaction } from '@shared/store/transaction'
import { useParams } from 'react-router-dom'
import { StatsPanel } from './components/stats.panel'
import { ActiveFilters, TransactionFilter } from '@modules/transaction-filter'
import { TransactionHistory } from './components/transaction.history'
import { Pagination } from '@shared/ui/paggination'

export const TransactionsPage = () => {
  const { user } = useAuthUser()
  const { bank_id, account_id } = useParams()
  const { transaction } = useTransaction()

  // const { data } = useQueryTransactions(
  //   bank_id,
  //   account_id,
  //   1,
  //   user.uncrypted_token
  // )

  // useEffect(() => {
  //   console.log(data)
  // }, [data])

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {!bank_id && <TransactionForm iIsComponent />}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[--text-primary] mb-2">
            История транзакций
          </h1>
          <p className="text-lg text-(--text-secondary)">
            Все ваши финансовые операции в одном месте
          </p>
        </div>

        <StatsPanel />

        <TransactionFilter />

        {transaction.isFiltersExpanded && <ActiveFilters />}

        <div className="bg-(--bg-primary) mb-10 rounded-2xl shadow-sm border border-(--border-primary) overflow-hidden">
          <TransactionHistory />
        </div>
        <Pagination currentPage={1} totalPages={10} onPageChange={() => null} />

        <div className="mt-8 text-center">
          <p className="text-sm text-(--text-tertiary)">
            Показано {transaction.tansactionList.length} транзакций • Обновлено
            сегодня
          </p>
        </div>
      </div>
    </div>
  )
}
