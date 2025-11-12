import { themes } from '../config/theme.config'

export const applyTheme = (themeId) => {
  const theme = themes.find((t) => t.id === themeId)
  const root = document.documentElement

  if (theme) {
    try {
      // 1. Устанавливаем data-attribute для CSS селекторов
      root.setAttribute('data-theme', themeId)

      // 2. Сохраняем в localStorage для persistence
      localStorage.setItem('theme', themeId)

      // 3. Также сохраняем тип темы отдельно (light/dark)
      localStorage.setItem('theme-type', theme.type)

      console.log(`✅ Theme applied: ${themeId} (${theme.type})`)

      // 4. Диспатчим кастомное событие для других частей приложения
      window.dispatchEvent(
        new CustomEvent('themechange', {
          detail: { theme: themeId, type: theme.type },
        }),
      )
    } catch (error) {
      console.error('❌ Error applying theme:', error)
    }
  } else {
    console.warn(`⚠️ Theme not found: ${themeId}, falling back to light theme`)
    applyTheme('light')
  }
}

export const getSavedTheme = () => {
  try {
    return localStorage.getItem('theme') || 'light'
  } catch (error) {
    console.error('Error reading theme from localStorage:', error)
    return 'light'
  }
}

export const initializeTheme = () => {
  const savedTheme = getSavedTheme()

  // Проверяем, существует ли тема в нашем списке
  const themeExists = themes.some((t) => t.id === savedTheme)
  const themeToApply = themeExists ? savedTheme : 'light'

  applyTheme(themeToApply)
  return themeToApply
}

export const getCurrentTheme = () => {
  return document.documentElement.getAttribute('data-theme') || 'light'
}

export const getCurrentThemeType = () => {
  const currentTheme = getCurrentTheme()
  const theme = themes.find((t) => t.id === currentTheme)
  return theme ? theme.type : 'light'
}

export const toggleDarkLight = () => {
  const currentTheme = getCurrentTheme()
  const currentThemeData = themes.find((t) => t.id === currentTheme)

  if (currentThemeData) {
    // Ищем противоположную тему того же типа
    const oppositeThemes = themes.filter(
      (t) => t.type !== currentThemeData.type,
    )
    if (oppositeThemes.length > 0) {
      // Берем первую тему противоположного типа
      applyTheme(oppositeThemes[0].id)
      return oppositeThemes[0].id
    }
  }

  // Fallback: переключаем между light и dark
  const newTheme = currentTheme === 'light' ? 'dark' : 'light'
  applyTheme(newTheme)
  return newTheme
}

export const getNextTheme = () => {
  const currentTheme = getCurrentTheme()
  const currentIndex = themes.findIndex((t) => t.id === currentTheme)
  const nextIndex = (currentIndex + 1) % themes.length
  return themes[nextIndex].id
}

export const applySystemTheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  ) {
    applyTheme('dark')
  } else {
    applyTheme('light')
  }
}

export const watchSystemTheme = () => {
  if (window.matchMedia) {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (e.matches) {
          applyTheme('dark')
        } else {
          applyTheme('light')
        }
      })
  }
}
