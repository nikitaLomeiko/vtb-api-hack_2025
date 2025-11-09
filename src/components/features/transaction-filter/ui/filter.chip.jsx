export const FilterChip = ({ label, onRemove, color = 'blue' }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-800 border-blue-200',
    green: 'bg-green-100 text-green-800 border-green-200',
    purple: 'bg-purple-100 text-purple-800 border-purple-200',
  }

  return (
    <span
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-medium border ${colorClasses[color]}`}
    >
      {label}
      <button
        onClick={onRemove}
        className="ml-1.5 hover:opacity-70 transition-opacity"
      >
        ×
      </button>
    </span>
  )
}
