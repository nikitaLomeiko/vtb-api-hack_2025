import { ApiClient } from '@shared/api'
import { useQuery } from '@tanstack/react-query'

/**
 * Хук для GET-запросов
 * @param {string} queryKey - Уникальный ключ запроса
 * @param {string} url - Эндпоинт
 * @param {object} params - Query параметры
 * @param {object} options - Дополнительные опции React Query
 */
export const useApiQuery = (queryKey, url, params = {}, options = {}) => {
  return useQuery({
    queryKey: [queryKey, ...Object.values(params)], // Ключ зависит от параметров
    queryFn: async () => {
      const result = await ApiClient({
        url,
        method: 'GET',
        params,
      })
      return result.data
    },
    staleTime: 5 * 60 * 1000,
    ...options,
  })
}
