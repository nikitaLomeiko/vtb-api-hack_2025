export const StatCard = ({
  title,
  value,
  icon,
  color = 'blue',
  isCurrency = false,
}) => {
  const colorClasses = {
    blue: {
      bg: 'bg-[var(--accent-primary)]/20',
      text: 'text-[var(--accent-primary)]',
    },
    green: {
      bg: 'bg-green-100',
      text: 'text-green-600',
    },
    red: {
      bg: 'bg-red-100',
      text: 'text-red-600',
    },
    purple: {
      bg: 'bg-[var(--accent-secondary)]/20',
      text: 'text-[var(--accent-secondary)]',
    },
  }

  const formatValue = (val) => {
    if (!isCurrency) return val

    const num = Math.abs(val)
    const sign = val >= 0 ? '+' : '-'

    if (num >= 1000000) {
      return `${sign} ${(num / 1000000).toFixed(1)}M`
    } else if (num >= 1000) {
      return `${sign} ${(num / 1000).toFixed(0)}K`
    }
    return `${sign} ${num.toFixed(0)}`
  }

  return (
    <div className="bg-[var(--bg-secondary)] rounded-2xl shadow-sm p-6 border border-[var(--border-primary)]">
      <div className="flex items-center justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[var(--text-secondary)] truncate">
            {title}
          </p>
          <p
            className={`text-2xl font-bold mt-1 truncate ${
              isCurrency
                ? value >= 0
                  ? 'text-green-600'
                  : 'text-red-600'
                : 'text-[var(--text-primary)]'
            }`}
          >
            {formatValue(value)}
            {isCurrency ? ' ₽' : ''}
          </p>
        </div>
        <div
          className={`w-12 h-12 ${colorClasses[color].bg} rounded-xl flex items-center justify-center flex-shrink-0 ml-3`}
        >
          <div className={colorClasses[color].text}>{icon}</div>
        </div>
      </div>
    </div>
  )
}
