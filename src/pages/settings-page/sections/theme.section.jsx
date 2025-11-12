import { ThemeChanger, themes } from '@modules/theme-changer'

export const ThemeSection = ({ settings, onSettingChange }) => {
  const handleThemeSelect = (themeId) => {
    onSettingChange('theme', themeId)
  }

  const lightThemes = themes.filter((theme) => theme.type === 'light')
  const darkThemes = themes.filter((theme) => theme.type === 'dark')

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-primary">Внешний вид</h2>

      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-primary">Выбор темы</h3>

        <ThemeChanger
          label={'Светлые темы'}
          currentTheme={settings.theme}
          setTheme={handleThemeSelect}
          themes={lightThemes}
        />

        <ThemeChanger
          label={'Темные темы'}
          currentTheme={settings.theme}
          setTheme={handleThemeSelect}
          themes={darkThemes}
        />
      </div>
    </div>
  )
}
