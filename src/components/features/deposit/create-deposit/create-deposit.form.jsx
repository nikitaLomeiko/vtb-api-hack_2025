import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatBalance } from '@lib/utils/bank.utils'
import { useDepositStore } from '@store/deposit'

export const CreateDepositForm = () => {
  const navigate = useNavigate()
  const { mockDeposits, createDeposit, getProductById } = useDepositStore()

  const [formData, setFormData] = useState({
    productId: '',
    amount: '',
    termMonths: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedProduct = formData.productId
    ? getProductById(formData.productId)
    : null

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!selectedProduct) {
      alert('Пожалуйста, выберите тип вклада')
      return
    }

    setIsSubmitting(true)

    try {
      const amount = parseFloat(formData.amount)
      const termMonths = parseInt(formData.termMonths)

      if (
        amount < selectedProduct.minAmount ||
        amount > selectedProduct.maxAmount
      ) {
        alert(
          `Сумма должна быть от ${formatBalance(
            selectedProduct.minAmount
          )} до ${formatBalance(selectedProduct.maxAmount)} ₽`
        )
        return
      }

      if (termMonths !== selectedProduct.termMonths) {
        alert(
          `Срок вклада должен составлять ${selectedProduct.termMonths} месяцев`
        )
        return
      }

      const newDeposit = createDeposit({
        productId: formData.productId,
        productName: selectedProduct.productName,
        interestRate: selectedProduct.interestRate,
        amount: amount,
        termMonths: termMonths,
        description: selectedProduct.description,
      })

      alert('Вклад успешно создан!')
      navigate('/deposit')
    } catch (error) {
      alert('Ошибка при создании вклада')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProductChange = (productId) => {
    const product = getProductById(productId)
    setFormData({
      productId,
      amount: product?.minAmount.toString() || '',
      termMonths: product?.termMonths.toString() || '',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 mb-[110px] md:mb-0">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center mb-8">
          <button
            onClick={() => navigate('/deposit')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors mr-6"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Назад</span>
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              Открытие вклада
            </h1>
            <p className="text-gray-600 mt-2">
              Выберите подходящий тип вклада и укажите параметры
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Тип вклада *
              </label>
              <div className="space-y-3">
                {mockDeposits.map((product) => (
                  <div
                    key={product.productId}
                    onClick={() => handleProductChange(product.productId)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.productId === product.productId
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">
                          {product.productName}
                        </h3>
                        <p className="text-gray-600 text-sm mt-1">
                          {product.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {product.interestRate}% годовых
                          </span>
                          <span className="text-gray-500">
                            {product.termMonths} мес
                          </span>
                          <span className="text-gray-500">
                            от {formatBalance(product.minAmount)} ₽
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            formData.productId === product.productId
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedProduct && (
              <div className="bg-blue-50 rounded-xl p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-3">
                  Условия выбранного вклада
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-blue-700">Минимальная сумма:</span>
                    <span className="text-blue-900 font-medium ml-2">
                      {formatBalance(selectedProduct.minAmount)} ₽
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Максимальная сумма:</span>
                    <span className="text-blue-900 font-medium ml-2">
                      {formatBalance(selectedProduct.maxAmount)} ₽
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Процентная ставка:</span>
                    <span className="text-blue-900 font-medium ml-2">
                      {selectedProduct.interestRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Срок:</span>
                    <span className="text-blue-900 font-medium ml-2">
                      {selectedProduct.termMonths} месяцев
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Сумма вклада *
              </label>
              <div className="relative">
                <input
                  id="amount"
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) =>
                    setFormData({ ...formData, amount: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed"
                  placeholder="Введите сумму"
                  min={selectedProduct?.minAmount || 0}
                  max={selectedProduct?.maxAmount || 10000000}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₽
                </div>
              </div>
              {selectedProduct && (
                <p className="text-sm text-gray-500 mt-2">
                  Доступный диапазон: {formatBalance(selectedProduct.minAmount)}{' '}
                  - {formatBalance(selectedProduct.maxAmount)} ₽
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="termMonths"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Срок вклада *
              </label>
              <input
                id="termMonths"
                type="number"
                disabled
                required
                value={formData.termMonths}
                onChange={(e) =>
                  setFormData({ ...formData, termMonths: e.target.value })
                }
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed"
                placeholder="Введите срок в месяцах"
                min={selectedProduct?.termMonths || 1}
                max={selectedProduct?.termMonths || 60}
              />
              {selectedProduct && (
                <p className="text-sm text-gray-500 mt-2">
                  Фиксированный срок: {selectedProduct.termMonths} месяцев
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedProduct}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              {isSubmitting ? 'Создание...' : 'Открыть вклад'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
