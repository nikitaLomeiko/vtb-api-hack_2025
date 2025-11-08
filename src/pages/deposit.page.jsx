import React from 'react'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { DepositList } from '@components/widgets/deposit.list'

export const Deposit = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-(--bg-primary) py-8 flex items-start">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-(--text-primary)">
              Вклады и инвестиции
            </h1>
            <p className="text-(--text-secondary) mt-2">
              Выгодные предложения по вкладам от проверенных банков
            </p>
          </div>
        </div>

        <DepositList />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-(--bg-secondary) rounded-2xl p-6 border border-(--border-primary)">
            <h3 className="font-bold text-(--text-primary) mb-2">
              Почему выбирают вклады?
            </h3>
            <ul className="text-(--text-secondary) text-sm space-y-2">
              <li>• Гарантированная доходность</li>
              <li>• Защита средств</li>
              <li>• Простые условия</li>
            </ul>
          </div>

          <div className="bg-(--bg-secondary) rounded-2xl p-6 border border-(--border-primary)">
            <h3 className="font-bold text-(--text-primary) mb-2">
              На что обратить внимание?
            </h3>
            <ul className="text-(--text-secondary) text-sm space-y-2">
              <li>• Процентная ставка</li>
              <li>• Срок размещения</li>
              <li>• Условия досрочного снятия</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
