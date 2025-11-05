import React from 'react';
import { CreditCardIcon } from '@heroicons/react/24/outline';
import { formatBalance, declineAccount } from '@lib/utils/bank.utils';

export const BankBody = ({ bankItem, onBankClick }) => {
  const handleBankNavigation = (e) => {
    e.stopPropagation();
    onBankClick(bankItem);
  };

  return (
    <div className="mt-3">
      <div className="bg-gray-50 rounded-2xl p-4 border border-gray-200">
        {/* Заголовок списка счетов */}
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-gray-900 text-base md:text-lg">Счета банка</h4>
          <span className="text-gray-500 text-sm">
            {bankItem.accounts.length} {declineAccount(bankItem.accounts.length)}
          </span>
        </div>

        {/* Список всех счетов */}
        <div className="space-y-3">
          {bankItem.accounts.map((account, accIndex) => (
            <div 
              key={account.id}
              onClick={handleBankNavigation}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-3 md:p-4 bg-white rounded-xl border border-gray-200/50 hover:border-gray-300 transition-colors cursor-pointer space-y-2 sm:space-y-0"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl flex items-center justify-center border border-gray-200 flex-shrink-0">
                  <CreditCardIcon className="w-4 h-4 md:w-6 md:h-6 text-gray-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 text-base md:text-lg truncate">
                    {account.id ? `•••• ${account.id.slice(-4)}` : 'Новый счет'}
                  </p>
                  <p className="text-gray-500 text-sm truncate">{account.name || 'Основной счет'}</p>
                </div>
              </div>
              
              <div className="text-right sm:text-left sm:min-w-24">
                <p className="text-lg md:text-xl font-bold text-gray-900 whitespace-nowrap">
                  {formatBalance(account.balance)} ₽
                </p>
                <div className="flex items-center space-x-2 justify-end sm:justify-start mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <p className="text-gray-400 text-xs">активен</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Действия с банком */}
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-4 pt-4 border-t border-gray-200">
          <button 
            onClick={handleBankNavigation}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition-colors text-center text-sm md:text-base"
          >
            Управление счетами
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              console.log('Быстрый перевод для', bankItem.name);
            }}
            className="flex-1 bg-white border border-blue-600 text-blue-600 hover:bg-blue-50 py-3 rounded-xl font-semibold transition-colors text-center text-sm md:text-base"
          >
            Быстрый перевод
          </button>
        </div>
      </div>
    </div>
  );
};