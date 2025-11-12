import { useTransaction } from '@shared/store/transaction'

export const TransactionFilter = () => {
  const {
    transaction,
    dateChange,
    toggleFilterExpanded,
    setSearchQuery,
    setActiveFilter,
  } = useTransaction()

  const hasActiveFilters =
    transaction.activeFilter !== 'all' ||
    transaction.dateRange.start ||
    transaction.dateRange.end ||
    transaction.searchQuery

  return (
    <div className="bg-(--bg-secondary) rounded-2xl shadow-sm border border-(--border-primary) mb-8 overflow-hidden">
      <div
        className="flex items-center justify-between p-6 cursor-pointer hover:bg-(--bg-tertiary) transition-colors"
        onClick={toggleFilterExpanded}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-(--accent-primary) to-(--accent-secondary) rounded-xl flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
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
          </div>
          <div>
            <h3 className="font-semibold text-(--text-primary)">
              Фильтры и поиск
            </h3>
            <p className="text-sm text-(--text-secondary)">
              Уточните параметры отображения
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <span className="px-3 py-1 bg-(--accent-secondary)/20 text-(--text-secondary) rounded-full text-sm font-medium">
              Активные фильтры
            </span>
          )}
          <svg
            className={`w-5 h-5 text-(--text-tertiary) transition-transform duration-200 ${
              transaction.isFiltersExpanded ? 'rotate-180' : ''
            }`}
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
        </div>
      </div>

      {transaction.isFiltersExpanded && (
        <div className="border-t border-(--border-primary) p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-(--text-primary) mb-3">
              Тип операции
            </label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: 'all', label: 'Все операции', color: 'gray' },
                { key: 'credit', label: 'Доходы', color: 'green' },
                { key: 'debit', label: 'Расходы', color: 'red' },
              ].map(({ key, label, color }) => (
                <button
                  key={key}
                  onClick={() => setActiveFilter(key)}
                  className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                    transaction.activeFilter === key
                      ? `bg-${color}-600 text-white shadow-sm`
                      : 'text-(--text-secondary) border border-(--border-primary) hover:border-(--border-secondary) hover:shadow-sm'
                  }`}
                >
                  {transaction.activeFilter === key && (
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-2">
                Поиск по описанию
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Введите название транзакции..."
                  value={transaction.searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 border border-(--border-primary) rounded-xl focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) transition-colors bg-(--bg-primary) text-(--text-primary)"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-(--text-tertiary)"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-2">
                Период
              </label>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <input
                    type="date"
                    value={transaction.dateRange.start}
                    onChange={(e) => dateChange('start', e.target.value)}
                    className="w-full px-4 py-3 border border-(--border-primary) rounded-xl focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) transition-colors bg-(--bg-primary) text-(--text-primary)"
                  />
                  <span className="absolute -top-2 left-3 px-1 bg-(--bg-secondary) text-xs text-(--text-tertiary)">
                    С
                  </span>
                </div>
                <div className="relative">
                  <input
                    type="date"
                    value={transaction.dateRange.end}
                    onChange={(e) => dateChange('end', e.target.value)}
                    className="w-full px-4 py-3 border border-(--border-primary) rounded-xl focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) transition-colors bg-(--bg-primary) text-(--text-primary)"
                  />
                  <span className="absolute -top-2 left-3 px-1 bg-(--bg-secondary) text-xs text-(--text-tertiary)">
                    По
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
