export const NavigationItem = ({ item, isActive, onClick }) => {
  const { icon: Icon, label } = item

  return (
    <li>
      <button
        onClick={() => onClick(item.id)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-md transition-colors ${
          isActive
            ? 'bg-(--accent-primary)/20 text-(--accent-primary) border border-(--accent-primary)/30'
            : 'text-(--text-primary) hover:bg-(--bg-tertiary)'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </button>
    </li>
  )
}
