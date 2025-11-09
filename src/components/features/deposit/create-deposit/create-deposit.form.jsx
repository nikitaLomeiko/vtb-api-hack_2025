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
    <div className="min-h-screen relative bg-(--bg-primary) py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="flex items-center mb-8">
          <div className="md:ml-8">
            <h1 className="text-2xl md:text-3xl font-bold text-(--text-primary)">
              Открытие вклада
            </h1>
            <p className="text-(--text-secondary) mt-2">
              Выберите подходящий тип вклада и укажите параметры
            </p>
          </div>
        </div>

        <div className="bg-(--bg-primary) rounded-2xl p-6 shadow-sm border border-(--border-primary)">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-(--text-primary) mb-3">
                Тип вклада *
              </label>
              <div className="space-y-3">
                {mockDeposits.map((product) => (
                  <div
                    key={product.productId}
                    onClick={() => handleProductChange(product.productId)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      formData.productId === product.productId
                        ? 'border-(--accent-primary) bg-(--bg-secondary)'
                        : 'border-(--border-primary) hover:border-(--border-secondary)'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-(--text-primary)">
                          {product.productName}
                        </h3>
                        <p className="text-(--text-secondary) text-sm mt-1">
                          {product.description}
                        </p>
                        <div className="flex items-center space-x-4 mt-2 text-sm">
                          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {product.interestRate}% годовых
                          </span>
                          <span className="text-(--text-secondary)">
                            {product.termMonths} мес
                          </span>
                          <span className="text-(--text-secondary)">
                            от {formatBalance(product.minAmount)} ₽
                          </span>
                        </div>
                      </div>
                      <div className="ml-4">
                        <div
                          className={`w-5 h-5 rounded-full border-2 ${
                            formData.productId === product.productId
                              ? 'bg-(--accent-primary) border-(--accent-primary)'
                              : 'border-(--border-primary)'
                          }`}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {selectedProduct && (
              <div className="bg-(--bg-secondary) rounded-xl p-4 border border-(--border-primary)">
                <h4 className="font-semibold text-(--text-primary) mb-3">
                  Условия выбранного вклада
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-(--text-secondary)">
                      Минимальная сумма:
                    </span>
                    <span className="text-(--text-primary) font-medium ml-2">
                      {formatBalance(selectedProduct.minAmount)} ₽
                    </span>
                  </div>
                  <div>
                    <span className="text-(--text-secondary)">
                      Максимальная сумма:
                    </span>
                    <span className="text-(--text-primary) font-medium ml-2">
                      {formatBalance(selectedProduct.maxAmount)} ₽
                    </span>
                  </div>
                  <div>
                    <span className="text-(--text-secondary)">
                      Процентная ставка:
                    </span>
                    <span className="text-(--text-primary) font-medium ml-2">
                      {selectedProduct.interestRate}%
                    </span>
                  </div>
                  <div>
                    <span className="text-(--text-secondary)">Срок:</span>
                    <span className="text-(--text-primary) font-medium ml-2">
                      {selectedProduct.termMonths} месяцев
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-(--text-primary) mb-2"
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
                  className="w-full px-4 py-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary) disabled:bg-(--bg-secondary) disabled:text-(--text-tertiary) disabled:border-(--border-primary) disabled:cursor-not-allowed"
                  placeholder="Введите сумму"
                  min={selectedProduct?.minAmount || 0}
                  max={selectedProduct?.maxAmount || 10000000}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-(--text-secondary)">
                  ₽
                </div>
              </div>
              {selectedProduct && (
                <p className="text-sm text-(--text-secondary) mt-2">
                  Доступный диапазон: {formatBalance(selectedProduct.minAmount)}{' '}
                  - {formatBalance(selectedProduct.maxAmount)} ₽
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="termMonths"
                className="block text-sm font-medium text-(--text-primary) mb-2"
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
                className="w-full px-4 py-3 border border-(--border-primary) rounded-lg focus:ring-2 focus:ring-(--accent-primary) focus:border-(--accent-primary) bg-(--bg-primary) text-(--text-primary) disabled:bg-(--bg-secondary) disabled:text-(--text-tertiary) disabled:border-(--border-primary) disabled:cursor-not-allowed"
                placeholder="Введите срок в месяцах"
                min={selectedProduct?.termMonths || 1}
                max={selectedProduct?.termMonths || 60}
              />
              {selectedProduct && (
                <p className="text-sm text-(--text-secondary) mt-2">
                  Фиксированный срок: {selectedProduct.termMonths} месяцев
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !selectedProduct}
              className="w-full bg-(--accent-primary) hover:bg-(--accent-hover) disabled:bg-(--text-tertiary) disabled:cursor-not-allowed text-white py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              {isSubmitting ? 'Создание...' : 'Открыть вклад'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
