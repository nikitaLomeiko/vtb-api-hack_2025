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
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">
          Вход в приложение
        </h1>
        <p className="text-[var(--text-secondary)]">
          Введите ваш email для получения кода доступа
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[var(--text-primary)] mb-2"
          >
            Email
          </label>
          <input
            {...register('email')}
            type="email"
            id="email"
            className="w-full px-4 py-3 border border-[var(--border-primary)] rounded-xl focus:ring-2 focus:ring-[var(--accent-primary)] focus:border-[var(--accent-primary)] transition-colors bg-[var(--bg-primary)] text-[var(--text-primary)]"
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
          className="w-full bg-[var(--accent-primary)] text-white py-3 px-4 rounded-xl font-medium hover:bg-[var(--accent-hover)] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
