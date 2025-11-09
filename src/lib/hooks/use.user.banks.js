import { ApiClient } from '@api/client'
import { useQuery } from '@tanstack/react-query'

export const useUserBanks = () => {
  return useQuery({
    queryKey: ['user-banks'],
    queryFn: async () => {
      const result = await ApiClient({
        url: '/my/banks',
        method: 'GET',
      })
      return result.data
    },
  })
}
