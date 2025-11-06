import React from 'react'
import { AuthFlow } from '@components/features/auth'
import { PinLogin } from '@components/features/login'

export const AuthProvider = ({ onAuthSuccess, children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [showPinLogin, setShowPinLogin] = React.useState(false)
  const [isChecking, setIsChecking] = React.useState(true)

  // Проверяем при загрузке - есть ли сохраненный пин
  React.useEffect(() => {
    const checkAuthStatus = () => {
      const hasPin = !!localStorage.getItem('user_pin')
      setShowPinLogin(hasPin)
      setIsChecking(false)
    }

    checkAuthStatus()
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setShowPinLogin(true)
    onAuthSuccess?.()
  }

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
    onAuthSuccess?.()
  }

  // Пока проверяем аутентификацию
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-gray-600">Проверка авторизации...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return showPinLogin ? (
      <PinLogin onLoginSuccess={handleLoginSuccess} />
    ) : (
      <AuthFlow onAuthSuccess={handleAuthSuccess} />
    )
  }

  return children
}
