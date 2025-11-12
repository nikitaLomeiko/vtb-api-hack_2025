import React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

export const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  className = '',
  showInfo = true,
}) => {
  // Функция для генерации массива номеров страниц для отображения
  const getPageNumbers = () => {
    const totalNumbers = siblingCount * 2 + 3 // siblings + current + first + last + 2 dots
    const totalBlocks = totalNumbers + 2 // +2 for dots

    if (totalPages <= totalBlocks) {
      return Array.from({ length: totalPages }, (_, i) => i + 1)
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1)
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages)

    const shouldShowLeftDots = leftSiblingIndex > 2
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1

    const firstPageIndex = 1
    const lastPageIndex = totalPages

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => i + 1)
      return [...leftRange, '...', totalPages]
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1
      )
      return [firstPageIndex, '...', ...rightRange]
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = Array.from(
        { length: rightSiblingIndex - leftSiblingIndex + 1 },
        (_, i) => leftSiblingIndex + i
      )
      return [firstPageIndex, '...', ...middleRange, '...', lastPageIndex]
    }
  }

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page)
    }
  }

  const pageNumbers = getPageNumbers()

  if (totalPages <= 1) return null

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}
    >
      {showInfo && (
        <div className="text-sm text-gray-600">
          Страница <span className="font-semibold">{currentPage}</span> из{' '}
          <span className="font-semibold">{totalPages}</span>
        </div>
      )}

      <div className="flex items-center space-x-1">
        {/* Кнопка "Назад" */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg border transition-all duration-200 ${
            currentPage === 1
              ? 'text-gray-400 border-gray-200 cursor-not-allowed'
              : 'text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
          }`}
          aria-label="Предыдущая страница"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        {/* Номера страниц */}
        {pageNumbers.map((pageNumber, index) => {
          if (pageNumber === '...') {
            return (
              <span key={`dots-${index}`} className="px-3 py-2 text-gray-500">
                ...
              </span>
            )
          }

          return (
            <button
              key={pageNumber}
              onClick={() => handlePageChange(pageNumber)}
              className={`min-w-[40px] px-3 py-2 rounded-lg border transition-all duration-200 font-medium ${
                currentPage === pageNumber
                  ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                  : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
              aria-label={`Страница ${pageNumber}`}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          )
        })}

        {/* Кнопка "Вперед" */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg border transition-all duration-200 ${
            currentPage === totalPages
              ? 'text-gray-400 border-gray-200 cursor-not-allowed'
              : 'text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
          }`}
          aria-label="Следующая страница"
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}

export const AdvancedPagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
  siblingCount = 1,
  className = '',
  showItemsPerPage = true,
}) => {
  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-between gap-4 ${className}`}
    >
      {/* Информация о позиции */}
      <div className="text-sm text-gray-600">
        Показано{' '}
        <span className="font-semibold">
          {startItem}-{endItem}
        </span>{' '}
        из <span className="font-semibold">{totalItems}</span> элементов
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        {/* Выбор количества элементов на странице */}
        {showItemsPerPage && (
          <div className="flex items-center gap-2">
            <label
              htmlFor="itemsPerPage"
              className="text-sm text-gray-600 whitespace-nowrap"
            >
              Элементов на странице:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange?.(Number(e.target.value))}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Основная пагинация */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          siblingCount={siblingCount}
          showInfo={false}
        />
      </div>
    </div>
  )
}
