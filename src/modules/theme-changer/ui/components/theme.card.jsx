export const ThemeCard = ({ theme, isSelected, onSelect }) => {
  const { id, name, description } = theme

  return (
    <button
      onClick={() => onSelect(id)}
      className={`relative p-4 rounded-xl border-2 transition-all duration-200 hover:scale-105 hover:shadow-large w-full text-left ${
        isSelected
          ? 'border-accent ring-2 ring-accent ring-opacity-50'
          : 'border-primary hover:border-secondary'
      } bg-secondary`}
    >
      <div
        className={`absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center transition-all ${
          isSelected
            ? 'scale-100 opacity-100 accent-primary'
            : 'scale-0 opacity-0'
        }`}
      >
        <svg
          className="w-3 h-3 text-white"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      <div className="space-y-3">
        <div
          className="h-20 rounded-lg border-2 p-2 space-y-1 bg-primary border-primary"
          data-theme={id}
        >
          <div className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full accent-primary" />
            <div className="h-1 flex-1 rounded bg-secondary" />
          </div>

          <div className="space-y-1">
            <div
              className="h-1 rounded accent-primary"
              style={{ width: '70%' }}
            />
            <div
              className="h-1 rounded bg-secondary"
              style={{ width: '40%' }}
            />
            <div
              className="h-1 rounded bg-secondary"
              style={{ width: '60%' }}
            />
          </div>
        </div>

        <div className="space-y-1">
          <h3 className="font-semibold text-sm text-primary">{name}</h3>
          <p className="text-xs text-secondary">{description}</p>
        </div>
      </div>
    </button>
  )
}
