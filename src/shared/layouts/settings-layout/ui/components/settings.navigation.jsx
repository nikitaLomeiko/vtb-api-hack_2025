import { navigationItems } from '../../config/navigation.config'
import { NavigationItem } from './navigation.item'

export const SettingsNavigation = ({ activeSection, onSectionChange }) => {
  return (
    <div className="lg:w-64 shrink-0">
      <nav className="bg-(--bg-primary) rounded-lg border border-(--border-primary) p-2">
        <ul className="space-y-1">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.id}
              item={item}
              isActive={activeSection === item.id}
              onClick={onSectionChange}
            />
          ))}
        </ul>
      </nav>
    </div>
  )
}
