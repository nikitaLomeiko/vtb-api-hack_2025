import { useTransaction } from '@shared/store/transaction'
import { FilterChip } from './ui/filter.chip'

export const ActiveFilters = () => {
  const { transaction, clearFilters, removeFilter } = useTransaction()

  const hasActiveFilters =
    transaction.activeFilter !== 'all' ||
    transaction.dateRange.start ||
    transaction.dateRange.end ||
    transaction.searchQuery

  if (!hasActiveFilters) {
    return (
      <div className="text-sm text-(--text-secondary)">
        Фильтры не применены
      </div>
    )
  }

  return (
    <div className="flex flex-col pb-5 sm:flex-row justify-between items-start sm:items-center gap-4 pt-4 border-t border-(--border-primary)">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm text-(--text-secondary) font-medium">
          Применено:
        </span>

        {transaction.activeFilter !== 'all' && (
          <FilterChip
            label={
              transaction.activeFilter === 'credit' ? '📈 Доходы' : '📉 Расходы'
            }
            onRemove={() => removeFilter('type')}
            color="blue"
          />
        )}

        {transaction.dateRange.start && (
          <FilterChip
            label={`📅 С ${new Date(
              transaction.dateRange.start
            ).toLocaleDateString('ru-RU')}`}
            onRemove={() => removeFilter('startDate')}
            color="green"
          />
        )}

        {transaction.dateRange.end && (
          <FilterChip
            label={`📅 По ${new Date(
              transaction.dateRange.end
            ).toLocaleDateString('ru-RU')}`}
            onRemove={() => removeFilter('endDate')}
            color="green"
          />
        )}

        {transaction.searchQuery && (
          <FilterChip
            label={`🔍 "${transaction.searchQuery}"`}
            onRemove={() => removeFilter('search')}
            color="purple"
          />
        )}
      </div>

      <div className="flex gap-3">
        <button
          onClick={clearFilters}
          className="px-4 py-2.5 text-(--text-secondary) border border-(--border-primary) rounded-xl hover:border-(--border-secondary) hover:bg-(--bg-tertiary) transition-colors font-medium flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
          Сбросить все
        </button>

        <button className="px-6 py-2.5 bg-linear-to-r from-(--accent-primary) to-(--accent-secondary) text-white rounded-xl font-medium hover:from-(--accent-hover) hover:to-(--accent-secondary) transition-all duration-200 flex items-center gap-2 shadow-sm hover:shadow-md">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z"
            />
          </svg>
          Применить фильтры
        </button>
      </div>
    </div>
  )
}
