import { SettingsLayout } from '@components/settings-layout'
import { CogIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { ThemeSection } from './sections/theme.section'
import { useSettings } from '@store/settings'

export const SettingsPage = () => {
  const [activeSection, setActiveSection] = useState('profile')
  const { settings, setSettings } = useSettings()

  const updateSetting = (key, value) => {
    setSettings({ [key]: value })
  }

  const renderSection = () => {
    const sectionProps = {
      settings,
      onSettingChange: updateSetting,
    }

    switch (activeSection) {
      case 'appearance':
        return <ThemeSection {...sectionProps} />
      default:
        return (
          <div className="space-y-6">
            <p className="text-[var(--text-secondary)]">Раздел в разработке</p>
          </div>
        )
    }
  }

  return (
    <SettingsLayout
      title="Настройки"
      description="Управление настройками вашего аккаунта"
      icon={CogIcon}
      activeSection={activeSection}
      onSectionChange={setActiveSection}
    >
      <div className="flex-1">
        <div className="bg-[var(--bg-secondary)] rounded-lg border border-[var(--border-primary)] p-6">
          {renderSection()}
        </div>
      </div>
    </SettingsLayout>
  )
}
