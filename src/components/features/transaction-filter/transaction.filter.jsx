import { useTransaction } from "@store/transaction";

export const TransactionFilter = () => {
    const {transaction, dateChange, toggleFilterExpanded, setSearchQuery, setActiveFilter} = useTransaction()
    
    const hasActiveFilters = transaction.activeFilter !== 'all' || transaction.dateRange.start || transaction.dateRange.end || transaction.searchQuery
    

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
            {/* Заголовок фильтров */}
            <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={toggleFilterExpanded}
            >
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.207A1 1 0 013 6.5V4z" />
                        </svg>
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900">Фильтры и поиск</h3>
                        <p className="text-sm text-gray-500">Уточните параметры отображения</p>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    {hasActiveFilters && (
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                            Активные фильтры
                        </span>
                    )}
                    <svg 
                        className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                            transaction.isFiltersExpanded ? 'rotate-180' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </div>
            </div>

            {/* Расширенная панель фильтров */}
            {transaction.isFiltersExpanded && (
                <div className="border-t border-gray-200 p-6 space-y-6">
                    {/* Тип операции */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Тип операции
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { key: 'all', label: 'Все операции', color: 'gray' },
                                { key: 'credit', label: 'Доходы', color: 'green' },
                                { key: 'debit', label: 'Расходы', color: 'red' }
                            ].map(({ key, label, color }) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveFilter(key)}
                                    className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                                        transaction.activeFilter === key
                                            ? `bg-${color}-600 text-white shadow-sm`
                                            : 'text-gray-600 border border-gray-300 hover:border-gray-400 hover:shadow-sm'
                                    }`}
                                >
                                    {transaction.activeFilter === key && (
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    )}
                                    {label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Поиск и даты в одной строке */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Поиск */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Поиск по описанию
                            </label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    placeholder="Введите название транзакции..." 
                                    value={transaction.searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                />
                                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            </div>
                        </div>

                        {/* Фильтр по датам */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Период
                            </label>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="relative">
                                    <input 
                                        type="date" 
                                        value={transaction.dateRange.start}
                                        onChange={(e) => dateChange('start', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                    <span className="absolute -top-2 left-3 px-1 bg-white text-xs text-gray-500">
                                        С
                                    </span>
                                </div>
                                <div className="relative">
                                    <input 
                                        type="date" 
                                        value={transaction.dateRange.end}
                                        onChange={(e) => dateChange('end', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                                    />
                                    <span className="absolute -top-2 left-3 px-1 bg-white text-xs text-gray-500">
                                        По
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};