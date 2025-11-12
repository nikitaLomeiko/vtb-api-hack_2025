import { useLayoutEffect } from 'react'
import { useSettings } from '@shared/store/settings'
import { applyTheme, initializeTheme } from '@modules/theme-changer'

export const ThemeInitialProvider = ({ children }) => {
  const { setSettings } = useSettings()

  useLayoutEffect(() => {
    const theme = initializeTheme()
    applyTheme(theme)
    setSettings({ theme })
  }, [])

  return children
}
