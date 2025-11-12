import React, { useEffect } from 'react'
import { AuthFlow } from '@modules/auth'
import { PinLogin } from '@modules/login'

export const AuthProvider = ({ onAuthSuccess, children }) => {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false)
  const [showPinLogin, setShowPinLogin] = React.useState(false)

  useEffect(() => {
    setShowPinLogin(!!localStorage.getItem('token'))
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

  if (!isAuthenticated) {
    return showPinLogin ? (
      <PinLogin onLoginSuccess={handleLoginSuccess} />
    ) : (
      <AuthFlow onAuthSuccess={handleAuthSuccess} />
    )
  }

  return children
}
