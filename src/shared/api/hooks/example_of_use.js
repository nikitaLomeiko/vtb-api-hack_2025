// В вашем компоненте DepositList
import { useApiQuery } from '../hooks/useApiQuery'

export const DepositList = () => {
  const {
    data: deposits,
    isLoading,
    error,
    isSuccess,
  } = useApiQuery('deposits', '/products', { product_type: 'deposit' })

  if (isLoading) return <div>Загрузка вкладов...</div>
  if (error) return <div>Ошибка: {error.message}</div>

  return (
    <div>
      {isSuccess &&
        deposits.map((deposit) => (
          <div key={deposit.productId}>
            <h3>{deposit.productName}</h3>
            <p>Ставка: {deposit.interestRate}%</p>
          </div>
        ))}
    </div>
  )
}

import { useApiMutation } from '../hooks/useApiMutation'

export const CreateDepositForm = () => {
  const createDepositMutation = useApiMutation({
    invalidateQueries: ['deposits'], // Перезапросим список после создания
  })

  const handleSubmit = (formData) => {
    createDepositMutation.mutate({
      url: '/products',
      method: 'POST',
      data: formData,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* форма */}
      <button type="submit" disabled={createDepositMutation.isLoading}>
        {createDepositMutation.isLoading ? 'Создание...' : 'Создать вклад'}
      </button>
    </form>
  )
}
