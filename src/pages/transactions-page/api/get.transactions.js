import { ApiClient } from '@shared/api'
import { useQuery } from '@tanstack/react-query'

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
