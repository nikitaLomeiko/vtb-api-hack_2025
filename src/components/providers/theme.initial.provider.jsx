import { applyTheme, initializeTheme } from '@components/features/theme-changer'
import { useSettings } from '@store/settings'
import { useLayoutEffect } from 'react'

export const ThemeInitialProvider = ({ children }) => {
  const { setSettings } = useSettings()

  useLayoutEffect(() => {
    const theme = initializeTheme()
    applyTheme(theme)
    setSettings({ theme })
  }, [])

  return children
}
