import React, { memo, useState, useEffect } from 'react'

export const BankLoadingScreen = memo(({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const loadingSteps = [
    'Загрузка системы безопасности',
    'Инициализация модулей',
    'Подготовка интерфейса',
    'Завершение загрузки',
  ]

  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1,
    left: Math.random() * 100,
    delay: Math.random() * 10,
    duration: Math.random() * 2 + 1,
  }))

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Запускаем процесс плавного исчезновения
          setTimeout(() => {
            setIsExiting(true)
            // Даем время для анимации исчезновения перед вызовом колбэка
            setTimeout(() => {
              setIsComplete(true)
              onLoadingComplete?.()
            }, 500)
          }, 300)
          return 100
        }
        return prev + Math.random() * 8 + 4
      })
    }, 100)

    return () => clearInterval(timer)
  }, [onLoadingComplete])

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % loadingSteps.length)
    }, 800)

    return () => clearInterval(stepInterval)
  }, [loadingSteps.length])

  // Если загрузка завершена и компонент скрыт, возвращаем null
  if (isComplete) {
    return null
  }

  return (
    <div
      className={`
      min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-purple-900 
      flex items-center justify-center overflow-hidden
      transition-all duration-500 ease-in-out
      absolute top-0 left-0 w-[100vw] h-[100vh] z-90
      ${isExiting ? 'opacity-0' : 'opacity-100'}
    `}
    >
      {/* Анимированные частицы фона */}
      <div className="absolute inset-0">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className={`
              absolute rounded-full bg-blue-400 opacity-20
              transition-all duration-500
              ${isExiting ? 'opacity-0 scale-0' : 'opacity-20 scale-100'}
            `}
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${particle.duration}s infinite ${particle.delay}s`,
              transitionDelay: `${particle.id * 50}ms`,
            }}
          />
        ))}
      </div>

      {/* Градиентные шарики */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`
          absolute top-1/4 left-1/4 w-48 h-48 bg-linear-to-r from-blue-500 to-cyan-400 
          rounded-full opacity-20 blur-lg
          transition-all duration-600 ease-in-out
          ${
            isExiting
              ? 'opacity-0 scale-0 translate-y-10'
              : 'opacity-20 scale-100'
          }
        `}
        />
        <div
          className={`
          absolute bottom-1/3 right-1/4 w-32 h-32 bg-linear-to-r from-purple-500 to-pink-400 
          rounded-full opacity-20 blur-lg
          transition-all duration-700 ease-in-out
          ${
            isExiting
              ? 'opacity-0 scale-0 -translate-y-10'
              : 'opacity-20 scale-100'
          }
        `}
          style={{ animationDelay: '0.5s' }}
        />
      </div>

      {/* Центральный блок загрузки */}
      <div
        className={`
        relative z-10 bg-white/10 backdrop-blur-lg rounded-2xl p-6 mx-4 border border-white/20 
        shadow-xl max-w-sm w-full
        transition-all duration-500 ease-in-out
        ${
          isExiting
            ? 'opacity-0 scale-95 -translate-y-4'
            : 'opacity-100 scale-100'
        }
      `}
      >
        {/* Логотип банка */}
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div
              className={`
              w-12 h-12 bg-linear-to-r from-blue-600 to-purple-600 rounded-xl 
              flex items-center justify-center shadow-md
              transition-all duration-500 ease-out
              ${
                isExiting
                  ? 'scale-75 opacity-0 rotate-45'
                  : 'scale-100 opacity-100'
              }
            `}
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Заголовок */}
        <h1
          className={`
          text-xl font-bold text-white text-center mb-2
          transition-all duration-400
          ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100'}
        `}
        >
          МультиБанк
        </h1>
        <p
          className={`
          text-blue-200 text-center text-sm mb-6
          transition-all duration-400 delay-100
          ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100'}
        `}
        >
          Загрузка приложения...
        </p>

        {/* Прогресс бар */}
        <div
          className={`
          mb-4
          transition-all duration-400 delay-200
          ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100'}
        `}
        >
          <div className="flex justify-between text-xs text-blue-200 mb-2">
            <span>Выполняется...</span>
            <span>{Math.min(100, Math.round(progress))}%</span>
          </div>
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-150 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Текущий шаг загрузки */}
        <div
          className={`
          text-center
          transition-all duration-400 delay-300
          ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100'}
        `}
        >
          <div className="text-blue-300 text-xs font-medium h-5">
            {loadingSteps[currentStep]}
            <span className="inline-block ml-1 animate-pulse">...</span>
          </div>
        </div>

        {/* Индикатор безопасности */}
        <div
          className={`
          flex items-center justify-center mt-4 text-green-400 text-xs
          transition-all duration-400 delay-400
          ${isExiting ? 'opacity-0 translate-y-2' : 'opacity-100'}
        `}
        >
          <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Защищённое соединение
        </div>
      </div>

      {/* Версия */}
      <div
        className={`
        absolute bottom-4 right-4 text-blue-300 text-xs
        transition-all duration-500 delay-500
        ${isExiting ? 'opacity-0 translate-x-4' : 'opacity-100'}
      `}
      >
        v2.4.1
      </div>
    </div>
  )
})

BankLoadingScreen.displayName = 'BankLoadingScreen'
