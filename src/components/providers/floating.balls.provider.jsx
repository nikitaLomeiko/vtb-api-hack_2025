import React, { memo, useMemo } from 'react'

export const FloatingBallsProvider = memo(({ children, ballCount = 8 }) => {
  const balls = useMemo(
    () =>
      Array.from({ length: ballCount }, (_, i) => {
        const size = Math.random() * 16 + 8 // одинаковый размер для width и height
        const top = Math.random() * 100
        const left = Math.random() * 100

        return {
          id: i + 1,
          size,
          top,
          left,
          opacity: Math.random() * 0.3 + 0.2,
          // Уменьшена длительность анимации для более быстрого движения
          duration: Math.random() * 5 + 8, // было: Math.random() * 10 + 15
          color: i % 2 === 0 ? 'primary' : 'secondary',
        }
      }),
    [ballCount]
  )

  const animationsCSS = useMemo(
    () =>
      balls
        .map((ball) => {
          // Увеличена амплитуда движения для более заметного эффекта скорости
          const translateX1 = Math.random() * 300 - 150 // было: 200 - 100
          const translateY1 = Math.random() * 300 - 150
          const translateX2 = Math.random() * 300 - 150
          const translateY2 = Math.random() * 300 - 150
          const translateX3 = Math.random() * 300 - 150
          const translateY3 = Math.random() * 300 - 150
          const scale1 = Math.random() * 0.6 + 0.7 // более выраженное изменение масштаба
          const scale2 = Math.random() * 0.6 + 0.7
          const scale3 = Math.random() * 0.6 + 0.7

          return `
          @keyframes float${ball.id} {
            0% { transform: translate(0%, 0%) rotate(0deg) scale(1); }
            25% { transform: translate(${translateX1}%, ${translateY1}%) rotate(90deg) scale(${scale1}); }
            50% { transform: translate(${translateX2}%, ${translateY2}%) rotate(180deg) scale(${scale2}); }
            75% { transform: translate(${translateX3}%, ${translateY3}%) rotate(270deg) scale(${scale3}); }
            100% { transform: translate(0%, 0%) rotate(360deg) scale(1); }
          }
          .animate-float-${ball.id} { 
            animation: float${ball.id} ${ball.duration}s infinite linear; 
          }
        `
        })
        .join(''),
    [balls]
  )

  return (
    <div className="relative overflow-hidden">
      {/* Летающие шарики по всему экрану */}
      <div className="absolute inset-0 pointer-events-none z-90">
        {balls.map((ball) => (
          <div
            key={ball.id}
            className={`absolute rounded-full animate-float-${ball.id}`}
            style={{
              width: `${ball.size}px`,
              height: `${ball.size}px`,
              top: `${ball.top}%`,
              left: `${ball.left}%`,
              backgroundColor: `var(--accent-${ball.color})`,
              opacity: ball.opacity,
              animation: `float${ball.id} ${ball.duration}s infinite linear`,
            }}
          />
        ))}
      </div>

      {/* Дочерние компоненты */}
      <div className="relative z-10">{children}</div>

      {/* CSS анимации для шариков */}
      <style jsx>{animationsCSS}</style>
    </div>
  )
})

FloatingBallsProvider.displayName = 'FloatingBallsProvider'
