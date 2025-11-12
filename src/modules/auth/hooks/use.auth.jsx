import { useState } from 'react'
import { useApiMutation } from '@shared/api'
import { useAuthUser } from '@shared/store/auth'

export const useAuth = () => {
  const { setToken } = useAuthUser()

  const [localToken, setLocalToken] = useState('')
  const [sessionId, setSessionId] = useState('')
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

  const sendCodeToEmail = async (email) => {
    setIsLoading(true)

    const { data } = await authMutation.mutateAsync({
      url: '/auth/begin',
      method: 'POST',
      data: { email },
    })

    setSessionId(data.session_id)
    setIsLoading(false)
  }

  const verifyCode = async (code) => {
    setIsLoading(true)

    const { data } = await authMutation.mutateAsync({
      url: '/auth/complete',
      method: 'POST',
      data: { session_id: sessionId, code },
    })

    setIsLoading(false)

    if (data) {
      setLocalToken(data.token)
      return true
    }
    return false
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
