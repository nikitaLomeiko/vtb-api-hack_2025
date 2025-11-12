import { useBank } from '@shared/store/bank'
import { useState } from 'react'

const symbols = ['🍒', '🍋', '🍊', '🍇', '🍉', '🔔', '💎', '🍀']

const SlotMachine = () => {
  const { bank, addMoney, subtractMoney } = useBank()
  const [reels, setReels] = useState([0, 0, 0])
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState('')
  const [betAmount, setBetAmount] = useState(100)
  const [winAmount, setWinAmount] = useState(0)
  const [showWinAnimation, setShowWinAnimation] = useState(false)

  const betOptions = [50, 100, 200, 500, 1000]

  const spin = () => {
    if (spinning || bank.total < betAmount) return

    subtractMoney(betAmount)
    setSpinning(true)
    setResult('')
    setWinAmount(0)
    setShowWinAnimation(false)

    const spins = 30
    let currentSpin = 0

    const spinInterval = setInterval(() => {
      setReels([
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
        Math.floor(Math.random() * symbols.length),
      ])

      currentSpin++

      if (currentSpin >= spins) {
        clearInterval(spinInterval)

        const finalReels = [
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
          Math.floor(Math.random() * symbols.length),
        ]

        setReels(finalReels)
        setSpinning(false)

        // Расчет выигрыша
        if (
          finalReels[0] === finalReels[1] &&
          finalReels[1] === finalReels[2]
        ) {
          const winMultiplier = getWinMultiplier(finalReels[0])
          const win = betAmount * winMultiplier
          setResult(`🎉 ДЖЕКПОТ! x${winMultiplier} 🎉`)
          setWinAmount(win)
          addMoney(win)
          setShowWinAnimation(true)
        } else if (
          finalReels[0] === finalReels[1] ||
          finalReels[1] === finalReels[2]
        ) {
          setResult('🤝 Почти угадали! x2')
          const win = betAmount * 2
          setWinAmount(win)
          addMoney(win)
        } else {
          setResult('😢 Попробуйте еще раз!')
        }
      }
    }, 80)
  }

  const getWinMultiplier = (symbolIndex) => {
    const multipliers = {
      0: 5, // 🍒
      1: 5, // 🍋
      2: 5, // 🍊
      3: 10, // 🍇
      4: 10, // 🍉
      5: 15, // 🔔
      6: 20, // 💎
      7: 50, // 🍀
    }
    return multipliers[symbolIndex] || 5
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Анимированный фон */}
      <div className="absolute inset-0 bg-linear-to-br from-purple-500/10 via-blue-500/10 to-pink-500/10 animate-pulse"></div>

      <div className="relative z-10 bg-black/30 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 text-center drop-shadow-lg bg-linear-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
          🎰 Однорукий Бандит 🎰
        </h1>

        {/* Баланс и ставка */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8 p-4 bg-white/10 rounded-2xl border border-white/20">
          <div className="text-center md:text-left">
            <p className="text-white/80 text-sm">Ваш баланс</p>
            <p className="text-3xl font-bold text-green-400 drop-shadow-lg">
              {bank.total.toLocaleString()} RUB
            </p>
          </div>

          <div className="text-center">
            <p className="text-white/80 text-sm">Текущая ставка</p>
            <p className="text-2xl font-bold text-yellow-400 drop-shadow-lg">
              {betAmount} RUB
            </p>
          </div>
        </div>

        {/* Выбор ставки */}
        <div className="mb-8">
          <p className="text-white text-center mb-3 text-lg">
            Выберите ставку:
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {betOptions.map((bet) => (
              <button
                key={bet}
                onClick={() => setBetAmount(bet)}
                className={`px-4 py-2 rounded-xl font-bold transition-all duration-200 ${
                  betAmount === bet
                    ? 'bg-yellow-500 text-black shadow-lg scale-105'
                    : 'bg-white/20 text-white hover:bg-white/30'
                } ${bank.total < bet ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={bank.total < bet}
              >
                {bet} RUB
              </button>
            ))}
          </div>
        </div>

        {/* Слоты */}
        <div className="flex gap-3 md:gap-6 mb-8 relative">
          {reels.map((reel, index) => (
            <div key={index} className="relative">
              <div
                className={`w-24 h-24 md:w-32 md:h-32 bg-linear-to-br from-gray-800 to-gray-900 border-4 border-yellow-500 rounded-2xl flex items-center justify-center text-5xl md:text-6xl shadow-2xl overflow-hidden relative ${
                  spinning ? 'animate-spin-slow' : ''
                }`}
              >
                <div className={`transform ${spinning ? 'animate-slide' : ''}`}>
                  {symbols[reel]}
                </div>
              </div>
              {/* Эффект свечения при выигрыше */}
              {showWinAnimation && (
                <div className="absolute inset-0 bg-yellow-400/30 rounded-2xl animate-ping"></div>
              )}
            </div>
          ))}
        </div>

        {/* Кнопка спина */}
        <div className="text-center mb-6">
          <button
            className={`px-12 py-4 rounded-2xl text-white font-bold text-xl transition-all duration-300 shadow-2xl transform ${
              spinning
                ? 'bg-gray-600 cursor-not-allowed scale-95'
                : bank.total < betAmount
                ? 'bg-red-700 cursor-not-allowed'
                : 'bg-linear-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 hover:scale-105 active:scale-95'
            }`}
            onClick={spin}
            disabled={spinning || bank.total < betAmount}
          >
            {spinning ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Крутится...
              </span>
            ) : bank.total < betAmount ? (
              'Недостаточно средств'
            ) : (
              `Крутить за ${betAmount} RUB!`
            )}
          </button>
        </div>

        {/* Результат */}
        {result && (
          <div
            className={`mb-4 px-6 py-4 rounded-2xl font-bold text-xl md:text-2xl text-center transition-all duration-300 border-2 ${
              result.includes('ДЖЕКПОТ')
                ? 'bg-linear-to-r from-yellow-400 to-orange-400 text-black border-yellow-300 animate-bounce'
                : result.includes('Почти')
                ? 'bg-linear-to-r from-green-400 to-blue-400 text-white border-green-300'
                : 'bg-linear-to-r from-red-500 to-pink-500 text-white border-red-300'
            } shadow-2xl`}
          >
            {result}
            {winAmount > 0 && (
              <div className="text-3xl mt-2 text-green-300 drop-shadow-lg">
                +{winAmount.toLocaleString()} RUB!
              </div>
            )}
          </div>
        )}

        {/* Таблица выплат */}
        <div className="bg-black/50 rounded-2xl p-4 border border-white/20">
          <p className="text-white text-center mb-3 font-bold">
            Таблица выплат:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            {symbols.map((symbol, index) => (
              <div
                key={symbol}
                className="flex items-center gap-2 bg-white/10 rounded-lg p-2"
              >
                <span className="text-2xl">{symbol}</span>
                <span className="text-yellow-400 font-bold">
                  x{getWinMultiplier(index)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Дополнительная информация */}
      <div className="mt-8 text-white/70 text-center text-sm">
        <p>🍀 Удачи! Соберите 3 одинаковых символа для выигрыша</p>
        <p className="mt-1">2 одинаковых символа = x2 к ставке</p>
      </div>
    </div>
  )
}

export default SlotMachine
