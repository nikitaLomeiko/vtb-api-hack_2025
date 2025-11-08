import { themes, ThemeChanger } from '@components/features/theme-changer/'

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

      {/* Предпросмотр темы */}
      <div className="bg-secondary rounded-xl p-6 border border-primary">
        <h3 className="text-lg font-semibold text-primary mb-4">
          Предпросмотр темы
        </h3>
        <div className="bg-tertiary rounded-lg border-2 border-primary p-4 space-y-3 max-w-md transition-all duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full accent-primary flex items-center justify-center text-white font-bold">
              A
            </div>
            <div>
              <div className="font-semibold text-primary">
                Заголовок карточки
              </div>
              <div className="text-sm text-secondary">
                Пример текста в выбранной теме
              </div>
            </div>
          </div>
          <div className="h-2 rounded-full bg-secondary" />
          <div className="flex gap-2">
            <div className="px-3 py-1 rounded text-xs font-medium accent-primary text-white">
              Кнопка
            </div>
            <div className="px-3 py-1 rounded text-xs border border-primary text-primary bg-primary">
              Вторичная
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
