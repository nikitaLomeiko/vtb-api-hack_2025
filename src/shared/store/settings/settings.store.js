import { create } from 'zustand'

export const useSettings = create((set, get) => ({
  settings: {
    darkMode: false,
    theme: 'light',
  },
  setSettings: (settings) => {
    const state = get()
    set({
      settings: {
        ...state.settings,
        ...settings,
      },
    })
  },
}))
