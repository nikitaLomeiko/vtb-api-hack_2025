import { useEffect } from 'react'

export const Modal = ({
  isOpen,
  onClose,
  isLogin,
  title,
  children,
  size = 'md',
}) => {
  if (!isOpen) return null

  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY

      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    }
  }, [isOpen])

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isLogin) {
      onClose()

      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''

      window.scrollTo(0, scrollY)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={handleOverlayClick}
    >
      <div
        className={`bg-(--bg-primary) rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] overflow-hidden p-4`}
      >
        {title && (
          <div className="flex items-center justify-between p-6 border-b border-(--border-primary)">
            <h2 className="text-xl font-semibold text-(--text-primary)">
              {title}
            </h2>
            {!isLogin && (
              <button
                onClick={onClose}
                className="text-(--text-tertiary) hover:text-(--text-primary) transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-(--accent-primary) rounded"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        )}

        <div className="overflow-y-auto max-h-[calc(90vh-140px)]">
          {children}
        </div>
      </div>
    </div>
  )
}
