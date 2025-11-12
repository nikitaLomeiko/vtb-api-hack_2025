import React from 'react'
import { BuildingLibraryIcon } from '@heroicons/react/24/outline'

export const AddBankHint = ({ onAddBank, bankCount }) => {
  if (bankCount >= 3) return null

  return (
    <div className="mt-6 md:mt-8 p-4 md:p-5 bg-linear-to-r from-(--bg-tertiary) to-(--bg-secondary) rounded-2xl border border-(--border-primary)/50">
      <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 text-center sm:text-left">
        <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-r from-(--accent-primary) to-(--accent-secondary) rounded-2xl flex items-center justify-center text-white text-base md:text-lg shadow-lg shrink-0">
          <BuildingLibraryIcon className="w-5 h-5 md:w-6 md:h-6" />
        </div>
        <div className="flex-1">
          <p className="text-(--text-primary) font-semibold text-sm md:text-base">
            Добавьте больше банков
          </p>
          <p className="text-(--text-secondary) text-xs md:text-sm mt-1">
            Объедините все ваши финансы для полного контроля
          </p>
        </div>
        <button
          onClick={onAddBank}
          className="bg-(--bg-primary) text-(--accent-primary) px-4 py-2 rounded-lg font-medium hover:bg-(--bg-tertiary) transition-colors border border-(--border-primary) w-full sm:w-auto mt-2 sm:mt-0"
        >
          Добавить
        </button>
      </div>
    </div>
  )
}
