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
        const banks = result.data.banks

        // Используем Promise.all для ожидания всех запросов
        const banksWithAccounts = await Promise.all(
          banks.map(async (bank) => {
            try {
              const accountsResult = await ApiClient({
                url: `/accounts?client_id=${bank.my_bank_client_id}`,
                method: 'GET',
                headers: {
                  'x-bank-id': bank.bank_id,
                  Authorization: `Bearer ${token}`,
                },
              })

              let accounts = []
              accounts = accountsResult.data.data.account

              return {
                ...bank,
                accounts: accounts,
              }
            } catch (error) {
              console.error(
                `Error fetching accounts for bank ${bank.bank_id}:`,
                error
              )
              return {
                ...bank,
                accounts: [],
              }
            }
          })
        )
        return banksWithAccounts
      }

      console.warn('Неизвестный формат ответа от /my/banks:', result.data)
      return []
    },
    staleTime: 5 * 60 * 1000,
  })
}
