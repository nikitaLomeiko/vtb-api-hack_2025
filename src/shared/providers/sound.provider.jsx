import '@shared/styles/index.css'
import { useEffect, useState } from 'react'

export const SoundProvider = ({ runAudio, children }) => {
  const [audioPlayed, setAudioPlayed] = useState(false)

  useEffect(() => {
    const audio = new Audio(runAudio)
    audio.volume = 0.5

    audio
      .play()
      .then(() => {
        setAudioPlayed(true)
      })
      .catch((error) => {
        console.log(
          'Автозапуск аудио заблокирован, ждем взаимодействия:',
          error
        )

        // Обработчики для первого пользовательского взаимодействия
        const handleFirstInteraction = () => {
          audio
            .play()
            .then(() => {
              setAudioPlayed(true)
            })
            .catch(console.error)

          // Удаляем обработчики после первого взаимодействия
          document.removeEventListener('click', handleFirstInteraction)
          document.removeEventListener('keydown', handleFirstInteraction)
          document.removeEventListener('touchstart', handleFirstInteraction)
        }

        // Добавляем обработчики для всех типов взаимодействий
        document.addEventListener('click', handleFirstInteraction)
        document.addEventListener('keydown', handleFirstInteraction)
        document.addEventListener('touchstart', handleFirstInteraction)

        // Очистка
        return () => {
          document.removeEventListener('click', handleFirstInteraction)
          document.removeEventListener('keydown', handleFirstInteraction)
          document.removeEventListener('touchstart', handleFirstInteraction)
        }
      })
  }, [])

  return (
    <>
      {children}
      {!audioPlayed && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            background: 'linear-gradient(45deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            padding: '10px',
            textAlign: 'center',
            zIndex: 10000,
            fontSize: '14px',
          }}
        >
          🔊 Кликните в любом месте для активации звука
        </div>
      )}
    </>
  )
}
