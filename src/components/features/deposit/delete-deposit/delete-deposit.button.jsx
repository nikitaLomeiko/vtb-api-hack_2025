import React, { useState } from 'react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { useDepositStore } from '@store/deposit'

export const DeleteDepositButton = ({ depositId, depositName, onSuccess }) => {
  const [isConfirming, setIsConfirming] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const { deleteDeposit } = useDepositStore()

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)) // Имитация запроса
      deleteDeposit(depositId)
      setIsConfirming(false)
      if (onSuccess) onSuccess()
    } catch (error) {
      alert('Ошибка при удалении вклада')
    } finally {
      setIsDeleting(false)
    }
  }

  if (isConfirming) {
    return (
      <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
        <div className="flex-1">
          <p className="text-red-800 text-sm font-medium">
            Удалить "{depositName}"?
          </p>
          <p className="text-red-600 text-xs mt-1">
            Это действие нельзя отменить
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            {isDeleting ? 'Удаление...' : 'Да'}
          </button>
          <button
            onClick={() => setIsConfirming(false)}
            className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded text-sm font-medium transition-colors"
          >
            Нет
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsConfirming(true)}
      className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
    >
      <TrashIcon className="w-4 h-4" />
      <span className="text-sm font-medium">Удалить</span>
    </button>
  )
}
