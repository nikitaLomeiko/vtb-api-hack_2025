import React, { useState } from 'react';
import { 
  EyeIcon, 
  EyeSlashIcon,
  ArrowsRightLeftIcon
} from '@heroicons/react/24/outline';
import { useBank } from '@store/bank';

export const BalanceSummaryCard = ({ onTransfer }) => {
  const [isBalanceVisible, setIsBalanceVisible] = useState(true);
  const { bank } = useBank();

  const formattedBalance = bank.total.toLocaleString('ru-RU', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  return (
    <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 relative overflow-hidden">
      
      {/* Маленькие летающие круги по всему пространству */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Круги с разными траекториями по всей карточке */}
        <div className="absolute top-1/4 left-1/4 w-4 h-4 md:w-6 md:h-6 rounded-full bg-blue-300/30 animate-float-wide-1"
          style={{ animation: 'floatWide1 15s infinite linear' }} 
        />
        <div className="absolute top-3/4 left-1/3 w-3 h-3 md:w-5 md:h-5 rounded-full bg-blue-400/40 animate-float-wide-2"
          style={{ animation: 'floatWide2 18s infinite linear' }} 
        />
        <div className="absolute top-1/3 left-3/4 w-5 h-5 md:w-7 md:h-7 rounded-full bg-purple-300/35 animate-float-wide-3"
          style={{ animation: 'floatWide3 12s infinite linear' }} 
        />
        <div className="absolute top-2/3 left-1/6 w-2 h-2 md:w-4 md:h-4 rounded-full bg-blue-500/45 animate-float-wide-4"
          style={{ animation: 'floatWide4 20s infinite linear' }} 
        />
        <div className="absolute top-1/6 left-2/3 w-4 h-4 md:w-6 md:h-6 rounded-full bg-purple-400/30 animate-float-wide-5"
          style={{ animation: 'floatWide5 16s infinite linear' }} 
        />
        <div className="absolute top-4/5 left-4/5 w-3 h-3 md:w-5 md:h-5 rounded-full bg-blue-600/35 animate-float-wide-6"
          style={{ animation: 'floatWide6 14s infinite linear' }} 
        />
        <div className="absolute top-1/2 left-1/8 w-4 h-4 md:w-6 md:h-6 rounded-full bg-purple-500/25 animate-float-wide-7"
          style={{ animation: 'floatWide7 22s infinite linear' }} 
        />
        <div className="absolute top-1/8 left-1/2 w-2 h-2 md:w-4 md:h-4 rounded-full bg-blue-300/40 animate-float-wide-8"
          style={{ animation: 'floatWide8 19s infinite linear' }} 
        />
      </div>

      {/* Заголовок */}
      <div className="text-center mb-8 md:mb-12 mt-10 relative z-10">
        <p className="text-gray-500 text-sm font-medium">Общий баланс</p>
      </div>

      {/* Основной баланс с кругами */}
      <div className="relative flex justify-center items-center mb-12 md:mb-16">
        {/* Большие пульсирующие круги вокруг цифры */}
        <div className="absolute flex items-center justify-center">
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-blue-400/25 animate-pulse"
            style={{ animation: 'pulse 4s infinite' }} 
          />
          <div className="absolute w-56 h-56 md:w-64 md:h-64 rounded-full bg-blue-500/30 animate-pulse"
            style={{ animation: 'pulse 3.5s infinite 0.3s' }} 
          />
          <div className="absolute w-32 h-32 md:w-48 md:h-48 rounded-full bg-blue-600/35 animate-pulse"
            style={{ animation: 'pulse 3s infinite 0.6s' }} 
          />
        </div>

        {/* Контейнер баланса и кнопки */}
        <div className="relative z-10 flex items-center md:space-x-6">
          {/* Основной баланс */}
          <div className={`transition-all duration-500 md:translate-x-4 ${
            !isBalanceVisible ? 'filter blur-[2px] opacity-80' : ''
          }`}>
            <h1 className="text-4xl md:text-7xl font-black text-blue-900">
              {isBalanceVisible ? `${formattedBalance} ₽` : '•••••••'}
            </h1>
          </div>

          {/* Кнопка скрытия */}
          <button 
            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
            className="p-2 md:p-3 hover:bg-gray-100 rounded-xl transition-colors flex-shrink-0 border border-gray-200 ml-2 md:ml-0 z-20"
          >
            {isBalanceVisible ? (
              <EyeSlashIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
            ) : (
              <EyeIcon className="w-5 h-5 md:w-6 md:h-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Кнопка перевода */}
      <button 
        onClick={onTransfer}
        className="w-full md:mt-40 mt-32 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 md:py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl relative z-10"
      >
        <ArrowsRightLeftIcon className="w-5 h-5" />
        <span>Перевести</span>
      </button>

      {/* CSS анимации */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.4;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.2;
          }
          100% {
            transform: scale(1);
            opacity: 0.4;
          }
        }

        /* Анимации по всему пространству карточки */
        @keyframes floatWide1 {
          0% {
            transform: translate(0%, 0%);
          }
          25% {
            transform: translate(200%, 100%);
          }
          50% {
            transform: translate(100%, 200%);
          }
          75% {
            transform: translate(-100%, 150%);
          }
          100% {
            transform: translate(0%, 0%);
          }
        }

        @keyframes floatWide2 {
          0% {
            transform: translate(0%, 0%);
          }
          33% {
            transform: translate(-150%, 100%);
          }
          66% {
            transform: translate(100%, -100%);
          }
          100% {
            transform: translate(0%, 0%);
          }
        }

        @keyframes floatWide3 {
          0% {
            transform: translate(0%, 0%);
          }
          25% {
            transform: translate(150%, -50%);
          }
          50% {
            transform: translate(-100%, 100%);
          }
          75% {
            transform: translate(50%, -150%);
          }
          100% {
            transform: translate(0%, 0%);
          }
        }

        @keyframes floatWide4 {
          0% {
            transform: translate(0%, 0%);
          }
          20% {
            transform: translate(-200%, 50%);
          }
          40% {
            transform: translate(100%, -200%);
          }
          60% {
            transform: translate(150%, 100%);
          }
          80% {
            transform: translate(-100%, -150%);
          }
          100% {
            transform: translate(0%, 0%);
          }
        }

        @keyframes floatWide5 {
          0% {
            transform: translate(0%, 0%);
          }
          50% {
            transform: translate(200%, -100%);
          }
          100% {
            transform: translate(0%, 0%);
          }
        }

        @keyframes floatWide6 {
          0% {
            transform: translate(0%, 0%);
          }
          33% {
            transform: translate(150%, 150%);
          }
          66% {
            transform: translate(-200%, -100%);
          }
          100% {
            transform: translate(0%, 0%);
          }
        }

        @keyframes floatWide7 {
          0% {
            transform: translate(0%, 0%);
          }
          25% {
            transform: translate(-150%, -200%);
          }
          50% {
            transform: translate(200%, 50%);
          }
          75% {
            transform: translate(-100%, 200%);
          }
          100% {
            transform: translate(0%, 0%);
          }
        }

        @keyframes floatWide8 {
          0% {
            transform: translate(0%, 0%);
          }
          20% {
            transform: translate(100%, -200%);
          }
          40% {
            transform: translate(-150%, 100%);
          }
          60% {
            transform: translate(200%, -100%);
          }
          80% {
            transform: translate(-100%, 150%);
          }
          100% {
            transform: translate(0%, 0%);
          }
        }
      `}</style>
    </div>
  );
};