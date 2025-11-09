import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'

export const BankEmptyState = ({ onAddBank }) => {
  return (
    <div className="text-center py-8 md:py-12">
      <div className="w-16 h-16 md:w-24 md:h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center text-2xl md:text-3xl mx-auto mb-4 md:mb-6 shadow-lg">
        🏛️
      </div>
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2">
        Нет добавленных банков
      </h3>
      <p className="text-gray-500 mb-4 md:mb-6 text-sm md:text-base">
        Добавьте ваш первый банк чтобы начать работу
      </p>
      <button
        onClick={onAddBank}
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 md:px-8 md:py-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 flex items-center justify-center space-x-2 mx-auto shadow-lg hover:shadow-xl w-full sm:w-auto"
      >
        <PlusIcon className="w-5 h-5 md:w-6 md:h-6" />
        <span className="font-semibold text-base md:text-lg">
          Добавить первый банк
        </span>
      </button>
    </div>
  )
}
