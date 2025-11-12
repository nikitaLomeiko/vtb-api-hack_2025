import { ApiClient } from '@shared/api'
import { useQuery } from '@tanstack/react-query'

export const useBankAccounts = (bankId, accountId, token) => {
  return useQuery({
    queryKey: ['bank-accounts'],
    queryFn: async () => {
      const result = await ApiClient({
        url: `/accounts?client_id=${accountId}`,
        method: 'GET',
        headers: {
          'x-bank-id': bankId,
          Authorization: `Bearer ${token}`,
        },
      })

      if (!result) {
        throw new Error('No response from server')
      }

      return result.data
    },
    staleTime: 5 * 60 * 1000,
  })
}
