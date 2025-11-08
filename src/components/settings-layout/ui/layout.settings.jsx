import { SettingsNavigation } from './components'

export const SettingsLayout = ({
  children,
  title,
  description,
  icon: Icon,
  activeSection,
  onSectionChange,
}) => {
  return (
    <div className="min-h-screen bg-white-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            {Icon && <Icon className="w-8 h-8 text-indigo-600" />}
            {title}
          </h1>
          <p className="text-gray-600 mt-2">{description}</p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          <SettingsNavigation
            activeSection={activeSection}
            onSectionChange={onSectionChange}
          />
          {children}
        </div>
      </div>
    </div>
  )
}
