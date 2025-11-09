import { ApiClient } from '@api/client'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useBanks = () => {
  return useQuery({
    queryKey: ['available-banks'],
    queryFn: async () => {
      const result = await ApiClient({
        url: '/banks',
        method: 'GET',
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

      console.warn('Неизвестный формат ответа от /banks:', result.data)
      return []
    },
  })
}

export const useAddBank = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (bankData) => {
      const result = await ApiClient({
        url: '/my/banks',
        method: 'POST',
        data: bankData,
        headers: {
          Authorization: `Bearer ${bankData.token}`,
        },
      })

      if (!result) {
        throw new Error('No response from server')
      }

      return result.data
    },
    onSuccess: () => {
      // Инвалидируем кэш банков пользователя
      queryClient.invalidateQueries({ queryKey: ['user-banks'] })
    },
  })
}
