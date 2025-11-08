export const SettingItem = ({ label, description, children, icon: Icon }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200">
      <div className="flex items-start gap-3">
        {Icon && <Icon className="w-5 h-5 text-gray-400 mt-0.5" />}
        <div>
          <h3 className="font-medium text-gray-900">{label}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="flex items-center">{children}</div>
    </div>
  )
}
