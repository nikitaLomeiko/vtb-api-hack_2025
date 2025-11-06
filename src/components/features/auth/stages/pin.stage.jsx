import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { pinSchema } from '../schema/auth.zod.schema'

const PinStage = ({ onSubmit, onBack, isLoading }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(pinSchema),
    mode: 'onChange',
  })

  const [showPin, setShowPin] = useState(false)
  const pin = watch('pin') || ''

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Создайте пин-код
        </h1>
        <p className="text-gray-600">
          Пин-код будет использоваться для быстрого входа в приложение
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="pin"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Пин-код (4 цифры)
          </label>
          <div className="relative">
            <input
              {...register('pin')}
              type={showPin ? 'text' : 'password'}
              id="pin"
              inputMode="numeric"
              maxLength="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors pr-12"
              placeholder="••••"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPin(!showPin)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPin ? '🙈' : '👁️'}
            </button>
          </div>
          {errors.pin && (
            <p className="mt-2 text-sm text-red-600">{errors.pin.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="confirmPin"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Подтвердите пин-код
          </label>
          <input
            {...register('confirmPin')}
            type="password"
            id="confirmPin"
            inputMode="numeric"
            maxLength="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="••••"
            disabled={isLoading}
          />
          {errors.confirmPin && (
            <p className="mt-2 text-sm text-red-600">
              {errors.confirmPin.message}
            </p>
          )}
        </div>

        {/* Визуализация пин-кода */}
        <div className="flex justify-center space-x-3">
          {[...Array(4)].map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full border-2 transition-colors ${
                index < pin.length
                  ? 'bg-blue-600 border-blue-600'
                  : 'border-gray-300'
              }`}
            />
          ))}
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onBack}
            disabled={isLoading}
            className="flex-1 bg-gray-100 text-gray-700 py-3 px-4 rounded-xl font-medium hover:bg-gray-200 disabled:opacity-50 transition-colors"
          >
            Назад
          </button>
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Сохранение...
              </div>
            ) : (
              'Завершить'
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default PinStage
