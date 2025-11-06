import React, { useState, useRef, useEffect } from 'react'

export const PinLogin = ({ onLoginSuccess }) => {
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
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

    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))

      const savedPin = localStorage.getItem('user_pin') || '1234'
      const isValid = submittedPin === savedPin

      if (isValid) {
        onLoginSuccess?.()
      } else {
        setError('Неверный пин-код')
        setPin('')
        inputsRef.current[0]?.focus()
      }
    } catch (error) {
      setError('Ошибка при входе')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-xs">
        <div className="text-center mb-8">
          <h1 className="text-xl font-semibold text-gray-900 mb-2">
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
                  focus:border-blue-500 focus:outline-none
                  ${error ? 'border-red-500' : 'border-gray-300'}
                  ${isLoading ? 'opacity-50' : ''}
                `}
                disabled={isLoading}
              />
            ))}
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center mt-3">{error}</p>
          )}
        </div>

        <button
          onClick={() => handleSubmit()}
          disabled={pin.length !== 4 || isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium disabled:opacity-50"
        >
          {isLoading ? '...' : 'Войти'}
        </button>
      </div>
    </div>
  )
}
