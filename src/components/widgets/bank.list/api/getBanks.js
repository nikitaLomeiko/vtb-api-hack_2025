import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@api/client'

export const useUserBanks = (token) => {
  return useQuery({
    queryKey: ['user-banks'],
    queryFn: async () => {
      const result = await ApiClient({
        url: '/my/banks',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!result) {
        throw new Error('No response from server')
      }

      // Обрабатываем разные форматы ответа
      if (Array.isArray(result.data)) {
        return result.data
      }

      if (result.data && Array.isArray(result.data.data)) {
        return result.data.data
      }

      if (result.data && Array.isArray(result.data.banks)) {
        return result.data.banks
      }

      console.warn('Неизвестный формат ответа от /my/banks:', result.data)
      return []
    },
    staleTime: 5 * 60 * 1000,
  })
}
