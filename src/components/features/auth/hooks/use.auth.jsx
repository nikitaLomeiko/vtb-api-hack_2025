import { useApiMutation } from '@api/hooks'
import { useAuthUser } from '@store/auth'
import { useState } from 'react'

export const useAuth = () => {
  const { setToken } = useAuthUser()

  const [localToken, setLocalToken] = useState('')
  const [currentStage, setCurrentStage] = useState('email')
  const [userData, setUserData] = useState({
    email: '',
    code: '',
    pin: '',
  })
  const [isLoading, setIsLoading] = useState(false)

  const authMutation = useApiMutation()

  const goToNextStage = () => {
    const stages = ['email', 'code', 'pin']
    const currentIndex = stages.indexOf(currentStage)
    if (currentIndex < stages.length - 1) {
      setCurrentStage(stages[currentIndex + 1])
    }
  }

  const goToPrevStage = () => {
    const stages = ['email', 'code', 'pin']
    const currentIndex = stages.indexOf(currentStage)
    if (currentIndex > 0) {
      setCurrentStage(stages[currentIndex - 1])
    }
  }

  const updateUserData = (data) => {
    setUserData((prev) => ({ ...prev, ...data }))
  }

  const simulateApiCall = (ms = 1000) => {
    return new Promise((resolve) => setTimeout(resolve, ms))
  }

  const sendCodeToEmail = async (email) => {
    setIsLoading(true)

    const token = await authMutation.mutateAsync({
      url: '/auth/login',
      method: 'POST',
      data: { email: 'pochta' },
    })

    setLocalToken(token)
    setIsLoading(false)
    return '123456'
  }

  const verifyCode = async (code) => {
    setIsLoading(true)
    await simulateApiCall(1000)
    const isValid = code === '123456'
    setIsLoading(false)
    return isValid
  }

  const createPin = (pin) => {
    setToken(localToken, pin)
    return true
  }

  return {
    currentStage,
    userData,
    isLoading,
    goToNextStage,
    goToPrevStage,
    updateUserData,
    sendCodeToEmail,
    verifyCode,
    createPin,
  }
}
