import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { emailSchema } from '../schema/auth.zod.schema'

const EmailStage = ({ onSubmit, isLoading, initialEmail }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(emailSchema),
    mode: 'onChange',
    defaultValues: {
      email: initialEmail || '',
    },
  })

  return (
    <div className="max-w-md mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Вход в приложение
        </h1>
        <p className="text-gray-600">
          Введите ваш email для получения кода доступа
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            placeholder="your@email.com"
            disabled={isLoading}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={!isValid || isLoading}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-xl font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Отправка...
            </div>
          ) : (
            'Получить код'
          )}
        </button>
      </form>
    </div>
  )
}

export default EmailStage
