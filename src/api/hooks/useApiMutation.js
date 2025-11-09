import { ApiClient } from '@api/client'
import { useMutation, useQueryClient } from '@tanstack/react-query'

/**
 * Хук для POST/PUT/DELETE запросов
 * @param {object} config - Конфигурация мутации
 */
export const useApiMutation = (config = {}) => {
  const queryClient = useQueryClient()

  const defaultConfig = {
    onSuccess: (data, variables, context) => {
      if (config.invalidateQueries) {
        queryClient.invalidateQueries({ queryKey: config.invalidateQueries })
      }
    },
    onError: (error, variables, context) => {
      console.error('Mutation error:', error.message)
    },
  }

  return useMutation({
    mutationFn: async ({ url, method = 'POST', data, params, headers }) => {
      const result = await ApiClient({
        url,
        method,
        data,
        params,
        headers,
      })
      return result.data
    },
    ...defaultConfig,
    ...config,
  })
}
