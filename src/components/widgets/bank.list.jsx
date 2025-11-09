import React, { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useBank } from '@store/bank'
import { useAccordion } from '@lib/hooks/use.accordion'
import { BankHeader } from '@components/shared/bank.header'
import { BankBody } from '@components/shared/bank.body'
import { BankEmptyState } from '@components/shared/bank.empty.state'
import { AddBankHint } from '@components/shared/add.bank.hint'
import { AddBankForm } from '@components/features/bank-form'
import { Modal } from '@components/shared/modal'

export const BanksList = ({ onBankClick }) => {
  const { bank } = useBank()
  const { toggleBank, isExpanded } = useAccordion()

  const [isVisibleAddBamkForm, setIsVisibleAddBamkForm] = useState(false)

  const totalAccounts = bank.bankList.reduce(
    (total, bankItem) => total + bankItem.accounts.length,
    0
  )

  return (
    <div className="bg-(--bg-primary) p-4 md:p-6 shadow-sm border-t border-(--border-primary)">
      <Modal
        isOpen={isVisibleAddBamkForm}
        onClose={() => setIsVisibleAddBamkForm(false)}
        title="Добавить банк"
        size="md"
      >
        <AddBankForm />
      </Modal>

      <AddBankForm />
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
          onClick={() => setIsVisibleAddBamkForm(true)}
          className="bg-(--accent-primary) text-white px-4 py-2 rounded-lg hover:bg-(--accent-hover) transition-colors flex items-center space-x-2"
        >
          <PlusIcon className="w-4 h-4" />
          <span>Добавить</span>
        </button>
      </div>

      <div className="space-y-3">
        {bank.bankList.map((bankItem, index) => (
          <div key={index} className="group transition-all duration-300">
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
        <BankEmptyState onAddBank={() => setIsVisibleAddBamkForm(true)} />
      )}

      <AddBankHint
        onAddBank={() => setIsVisibleAddBamkForm(true)}
        bankCount={bank.bankList.length}
      />
    </div>
  )
}
