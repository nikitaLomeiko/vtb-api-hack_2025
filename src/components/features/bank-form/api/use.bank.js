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

      // Если не смогли распарсить, возвращаем пустой массив
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
      })
      return result.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-banks'] })
    },
  })
}
