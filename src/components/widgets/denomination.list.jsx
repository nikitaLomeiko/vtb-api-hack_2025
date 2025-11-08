import { useBank } from '@store/bank'

export const DenominationList = () => {
  const { bank } = useBank()

  const calculateDenominations = (balance) => {
    const denominations = [
      {
        value: 5000,
        color:
          'bg-[var(--bg-tertiary)] text-[var(--accent-secondary)] border border-[var(--border-primary)]',
      },
      {
        value: 2000,
        color:
          'bg-[var(--bg-tertiary)] text-[var(--accent-primary)] border border-[var(--border-primary)]',
      },
      {
        value: 1000,
        color:
          'bg-[var(--bg-tertiary)] text-green-600 border border-[var(--border-primary)]',
      },
      {
        value: 500,
        color:
          'bg-[var(--bg-tertiary)] text-yellow-600 border border-[var(--border-primary)]',
      },
      {
        value: 100,
        color:
          'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border border-[var(--border-primary)]',
      },
    ]

    let remainingBalance = balance
    return denominations
      .map((denom) => {
        const count = Math.floor(remainingBalance / denom.value)
        remainingBalance = remainingBalance % denom.value
        return {
          ...denom,
          count: count > 0 ? count : 0,
        }
      })
      .filter((denom) => denom.count > 0)
  }

  const denominations = calculateDenominations(bank.total)

  return (
    <div className="my-5 ">
      <p className="text-[var(--text-secondary)] text-sm font-medium mb-4 text-center">
        Номиналы в обороте
      </p>
      <div className="flex justify-center flex-wrap gap-3">
        {denominations.map((denom, index) => (
          <div
            key={denom.value}
            className={`${denom.color} px-4 py-3 rounded-xl text-center min-w-24 transition-all duration-300 hover:scale-105 hover:shadow-md`}
          >
            <div className="font-bold text-lg">{denom.value} ₽</div>
            <div className="text-sm opacity-75 mt-1">{denom.count} шт</div>
          </div>
        ))}
      </div>
    </div>
  )
}
