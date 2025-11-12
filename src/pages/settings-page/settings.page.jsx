import { useState } from 'react'
import { useSettings } from '@shared/store/settings'
import { ProfileSection } from './sections/profile.section'
import { NotificationsSection } from './sections/notification.section'
import { SecuritySection } from './sections/security.section'
import { PaymentsSection } from './sections/payments.section'
import { PrivacySection } from './sections/privacy.section'
import { ThemeSection } from './sections/theme.section'
import { CogIcon } from '@heroicons/react/24/outline'
import { SettingsLayout } from '@shared/layouts/settings-layout'

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
      case 'profile':
        return <ProfileSection />
      case 'notification':
        return <NotificationsSection />
      case 'security':
        return <SecuritySection />
      case 'payments':
        return <PaymentsSection />
      case 'privacy':
        return <PrivacySection />
      case 'appearance':
        return <ThemeSection {...sectionProps} />

      default:
        return (
          <div className="space-y-6">
            <p className="text-(--text-secondary)">Раздел в разработке</p>
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
        <div className="bg-(--bg-secondary) rounded-lg border border-(--border-primary) p-6">
          {renderSection()}
        </div>
      </div>
    </SettingsLayout>
  )
}
