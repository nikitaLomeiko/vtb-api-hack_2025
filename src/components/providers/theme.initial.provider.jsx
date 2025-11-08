import { applyTheme, initializeTheme } from '@components/features/theme-changer'
import { useSettings } from '@store/settings'
import { useEffect } from 'react'

export const ThemeInitialProvider = ({ children }) => {
  const { setSettings } = useSettings()

  useEffect(() => {
    const theme = initializeTheme()
    applyTheme(theme)
    setSettings({ theme })
  }, [])

  return children
}
