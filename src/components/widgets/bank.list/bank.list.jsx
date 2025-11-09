import React, { useState, useEffect } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useBank } from '@store/bank'
import { useAccordion } from '@lib/hooks/use.accordion'
import { BankHeader } from '@components/shared/bank.header'
import { BankBody } from '@components/shared/bank.body'
import { BankEmptyState } from '@components/shared/bank.empty.state'
import { AddBankHint } from '@components/shared/add.bank.hint'
import { AddBankForm } from '@components/features/bank-form'
import { Modal } from '@components/shared/modal'
import { useUserBanks } from './api'
import { useAuthUser } from '@store/auth'

export const BanksList = ({ onBankClick }) => {
  const { user } = useAuthUser()
  const { bank, setBankList } = useBank()
  const { toggleBank, isExpanded } = useAccordion()
  const {
    data: userBanks,
    isLoading,
    error,
  } = useUserBanks(user.uncrypted_token)

  const [isVisibleAddBankForm, setIsVisibleAddBankForm] = useState(false)

  useEffect(() => {
    console.log(userBanks)
    if (userBanks && Array.isArray(userBanks)) {
      setBankList(userBanks)
    }
  }, [userBanks, setBankList])

  const totalAccounts = bank.bankList.reduce(
    (total, bankItem) => total + (bankItem.accounts?.length || 0),
    0
  )

  if (isLoading) {
    return (
      <div className="bg-(--bg-primary) p-4 md:p-6 shadow-sm border-t border-(--border-primary)">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-(--text-primary)">
              Мои банки
            </h2>
            <p className="text-(--text-secondary) text-sm">Загрузка...</p>
          </div>
          <div className="w-32 h-10 bg-(--bg-secondary) rounded-lg"></div>
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-20 bg-(--bg-secondary) rounded-xl"></div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-(--bg-primary) p-4 md:p-6 shadow-sm border-t border-(--border-primary)">
        <div className="text-center py-8">
          <p className="text-red-600 mb-4">Ошибка при загрузке банков</p>
          <button
            onClick={() => window.location.reload()}
            className="text-(--accent-primary) hover:text-(--accent-hover) font-medium"
          >
            Попробовать снова
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-(--bg-primary) p-4 md:p-6 shadow-sm border-t border-(--border-primary)">
      <Modal
        isOpen={isVisibleAddBankForm}
        onClose={() => setIsVisibleAddBankForm(false)}
        title="Добавить банк"
        size="md"
      >
        <AddBankForm onSuccess={() => setIsVisibleAddBankForm(false)} />
      </Modal>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-(--text-primary)">
            Мои банки
          </h2>
          <p className="text-(--text-secondary) text-sm">
            {bank.bankList.length} банков • {totalAccounts} счетов
          </p>
        </div>
        <button
          onClick={() => setIsVisibleAddBankForm(true)}
          className="bg-(--accent-primary) text-white px-4 py-2 rounded-lg hover:bg-(--accent-hover) transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Добавить</span>
        </button>
      </div>

      <div className="space-y-3">
        {bank.bankList.map((bankItem, index) => (
          <div
            key={bankItem.bank_id || index}
            className="group transition-all duration-300"
          >
            <BankHeader
              bankItem={bankItem}
              index={index}
              isExpanded={isExpanded(index)}
              onToggle={toggleBank}
              onBankClick={onBankClick}
            />

            {isExpanded(index) && (
              <BankBody bankItem={bankItem} onBankClick={onBankClick} />
            )}
          </div>
        ))}
      </div>

      {bank.bankList.length === 0 && (
        <BankEmptyState onAddBank={() => setIsVisibleAddBankForm(true)} />
      )}

      <AddBankHint
        onAddBank={() => setIsVisibleAddBankForm(true)}
        bankCount={bank.bankList.length}
      />
    </div>
  )
}
