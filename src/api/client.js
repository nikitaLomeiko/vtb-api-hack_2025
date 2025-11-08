// src/api/ApiClient.js
import { baseApi } from './client.js'

/**
 * Универсальный клиент для API запросов
 * @param {string} url - Эндпоинт
 * @param {string} method - HTTP метод (GET, POST, PUT, DELETE)
 * @param {object} data - Тело запроса (для POST/PUT)
 * @param {object} params - Query параметры
 * @param {object} headers - Дополнительные заголовки
 * @returns {Promise} Результат запроса
 */
export const ApiClient = async ({
  url,
  method = 'GET',
  data,
  params,
  headers = {},
}) => {
  const requestConfig = {
    method,
    url,
    params,
    data,
    headers: {
      ...baseApi.defaults.headers,
      ...headers,
    },
  }

  try {
    const response = await baseApi.request(requestConfig)

    return {
      data: response.data,
      status: response.status,
      total: response.headers['x-total-count'] || 0,
    }
  } catch (error) {
    console.error(
      'API Request Failed:',
      error.response?.data?.message || error.message,
      `Status: ${error.response?.status}`
    )

    throw new Error(error.response?.data?.message || 'Network error occurred')
  }
}
