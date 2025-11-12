import { TokenCrypto } from '@shared/utils'
import { create } from 'zustand'

const token_key = 'token'

export const useAuthUser = create((set, get) => ({
  user: {
    uncrypted_token: '',
    username: 'team074-5',
    error: '',
    isAuth: false,
  },
  setToken: (token, encryption_code) => {
    const store = get().user

    const crypto = new TokenCrypto(encryption_code)
    const encrypted = crypto.encryptToken(token)

    localStorage.setItem(token_key, encrypted)

    set({
      user: {
        ...store,
        uncrypted_token: token,
        isAuth: true,
      },
    })
  },
  getToken: (encryption_code) => {
    const result = {}
    const store = get().user
    const token = localStorage.getItem(token_key)

    if (token) {
      const crypto = new TokenCrypto(encryption_code)
      const decrypted = crypto.decryptToken(token)

      if (decrypted) {
        result.uncrypted_token = decrypted
        result.isAuth = true
      } else {
        result.error = 'Пин-код неверный'
      }
    } else {
      result.error = 'токен не найден'
    }

    set({
      user: {
        ...store,
        ...result,
      },
    })

    return result.error ? false : true
  },
  setError: (error) => {
    const store = get().user

    set({
      user: {
        ...store,
        error,
      },
    })
  },
}))
