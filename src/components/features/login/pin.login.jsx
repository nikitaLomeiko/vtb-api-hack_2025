import React, { useState, useRef, useEffect } from 'react'
import { FloatingBallsProvider } from '@components/providers/floating.balls.provider'
import { useAuthUser } from '@store/auth'

export const PinLogin = ({ onLoginSuccess }) => {
  const { user, getToken, setError } = useAuthUser()
  const [pin, setPin] = useState('')
  const inputsRef = useRef([])

  useEffect(() => {
    if (inputsRef.current[0]) {
      inputsRef.current[0].focus()
    }
  }, [])

  const handlePinChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newPin = pin.split('')
      newPin[index] = value
      const combinedPin = newPin.join('')
      setPin(combinedPin)
      setError('')

      if (value && index < 3) {
        inputsRef.current[index + 1]?.focus()
      }

      if (combinedPin.length === 4 && index === 3) {
        handleSubmit(combinedPin)
      }
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace') {
      if (!pin[index] && index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
      const newPin = pin.split('')
      newPin[index] = ''
      setPin(newPin.join(''))
    }
  }

  const handleSubmit = async (submittedPin = pin) => {
    if (submittedPin.length !== 4) return

    try {
      const isValid = getToken(submittedPin)

      if (isValid) {
        onLoginSuccess?.()
      }
    } catch (error) {
      setError('Ошибка при входе', error)
    }
  }

  return (
    <FloatingBallsProvider ballCount={20}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-[var(--bg-primary)]">
        <div className="w-full max-w-xs">
          <div className="text-center mb-8">
            <h1 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
              Введите пин-код
            </h1>
          </div>

          <div className="mb-6">
            <div className="flex justify-center space-x-3">
              {[...Array(4)].map((_, index) => (
                <input
                  key={index}
                  ref={(el) => (inputsRef.current[index] = el)}
                  type="password"
                  inputMode="numeric"
                  maxLength="1"
                  value={pin[index] || ''}
                  onChange={(e) => handlePinChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className={`
                  w-12 h-12 text-center text-lg border rounded-lg
                  focus:border-[var(--accent-primary)] focus:outline-none
                  bg-[var(--bg-primary)] text-[var(--text-primary)]
                  ${
                    user.error
                      ? 'border-red-500'
                      : 'border-[var(--border-primary)]'
                  }
                `}
                />
              ))}
            </div>

            {user.error && (
              <p className="text-red-500 text-sm text-center mt-3">
                {user.error}
              </p>
            )}
          </div>

          <button
            onClick={() => handleSubmit()}
            className="w-full bg-[var(--accent-primary)] text-white py-3 rounded-lg font-medium disabled:opacity-50 hover:bg-[var(--accent-hover)] transition-colors"
          >
            Войти
          </button>
        </div>
      </div>
    </FloatingBallsProvider>
  )
}
