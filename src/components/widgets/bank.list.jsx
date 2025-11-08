import React from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useBank } from '@store/bank'
import { useAccordion } from '@lib/hooks/use.accordion'
import { BankHeader } from '@components/shared/bank.header'
import { BankBody } from '@components/shared/bank.body'
import { BankEmptyState } from '@components/shared/bank.empty.state'
import { AddBankHint } from '@components/features/bank-form'

export const BanksList = ({ onAddBank, onBankClick }) => {
  const { bank } = useBank()
  const { toggleBank, isExpanded } = useAccordion()

  const totalAccounts = bank.bankList.reduce(
    (total, bankItem) => total + bankItem.accounts.length,
    0
  )

  return (
    <div className="bg-[var(--bg-primary)]  p-4 md:p-6 shadow-sm border-t border-[var(--border-primary)]">
      {/* Заголовок и статистика */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text-primary)]">
            Мои банки
          </h2>
          <p className="text-[var(--text-secondary)] text-sm">
            {bank.bankList.length} банков • {totalAccounts} счетов
          </p>
        </div>
        <button
          onClick={onAddBank}
          className="bg-[var(--accent-primary)] text-white px-4 py-2 rounded-lg hover:bg-[var(--accent-hover)] transition-colors flex items-center space-x-2"
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

      {bank.bankList.length === 0 && <BankEmptyState onAddBank={onAddBank} />}

      <AddBankHint onAddBank={onAddBank} bankCount={bank.bankList.length} />
    </div>
  )
}
