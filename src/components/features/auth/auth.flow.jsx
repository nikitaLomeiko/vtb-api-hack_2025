import React from 'react'
import { useAuth } from './hooks/use.auth'
import EmailStage from './stages/email.stage'
import CodeStage from './stages/code.stage'
import PinStage from './stages/pin.stage'

export const AuthFlow = ({ onAuthSuccess }) => {
  const {
    currentStage,
    userData,
    isLoading,
    goToNextStage,
    goToPrevStage,
    updateUserData,
    sendCodeToEmail,
    verifyCode,
    createPin,
  } = useAuth()

  const handleEmailSubmit = async (data) => {
    const { email } = data
    updateUserData({ email })
    await sendCodeToEmail(email)
    goToNextStage()
  }

  const handleCodeSubmit = async (data) => {
    const { code } = data
    const isValid = await verifyCode(code)
    if (isValid) {
      updateUserData({ code })
      goToNextStage()
    } else {
      alert('Неверный код. Попробуйте снова.')
    }
  }

  const handlePinSubmit = async (data) => {
    const { pin } = data
    const success = await createPin(pin)
    if (success) {
      updateUserData({ pin })
      console.log('Авторизация завершена!', userData)
      alert('Авторизация успешно завершена!')
      onAuthSuccess()
    }
  }

  const renderStage = () => {
    switch (currentStage) {
      case 'email':
        return (
          <EmailStage
            onSubmit={handleEmailSubmit}
            isLoading={isLoading}
            initialEmail={userData.email}
          />
        )
      case 'code':
        return (
          <CodeStage
            onSubmit={handleCodeSubmit}
            onBack={goToPrevStage}
            isLoading={isLoading}
            userEmail={userData.email}
          />
        )
      case 'pin':
        return (
          <PinStage
            onSubmit={handlePinSubmit}
            onBack={goToPrevStage}
            isLoading={isLoading}
          />
        )
      default:
        return null
    }
  }

  // Прогресс бар
  const getProgress = () => {
    const stages = ['email', 'code', 'pin']
    const currentIndex = stages.indexOf(currentStage)
    return ((currentIndex + 1) / stages.length) * 100
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Прогресс бар */}
      <div className="bg-white shadow-sm">
        <div className="max-w-md mx-auto px-6 py-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </div>
      </div>

      {/* Контент этапа */}
      <div className="flex-1 flex items-center justify-center py-8">
        {renderStage()}
      </div>
    </div>
  )
}
