import { useQuery } from '@tanstack/react-query'
import { ApiClient } from '@api/client'

export const useQueryTransactions = (bankId, accountId, page, token) => {
  return useQuery({
    queryKey: [`transactions_${bankId}_${accountId}`],
    queryFn: async () => {
      const result = await ApiClient({
        url: `/accounts/${accountId}/transactions?page=${page}`,
        method: 'GET',
        headers: {
          'x-bank-id': bankId,
          Authorization: `Bearer ${token}`,
        },
      })

      return result.data
    },
    staleTime: 5 * 60 * 1000,
  })
}
