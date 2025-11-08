export const NavigationItem = ({ item, isActive, onClick }) => {
  const { icon: Icon, label } = item

  return (
    <li>
      <button
        onClick={() => onClick(item.id)}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-md transition-colors ${
          isActive
            ? 'bg-indigo-50 text-indigo-700 border border-indigo-100'
            : 'text-gray-700 hover:bg-gray-50'
        }`}
      >
        <Icon className="w-5 h-5" />
        <span className="font-medium">{label}</span>
      </button>
    </li>
  )
}
