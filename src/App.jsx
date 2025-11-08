import '@styles/index.css'
import { Routing } from '@routes'
import { Layout } from '@components/layout'
import { AuthProvider } from '@components/providers/auth.provider'
import { SoundProvider } from '@components/providers/sound.provider'
import { ThemeInitialProvider } from '@components/providers/theme.initial.provider'
import { BankLoadingScreen } from '@components/providers/screen.loading'
import audio from './assets/audio/run.ogg'
// import stone from './assets/audio/stone.mp3'

function App() {
  return (
    <>
      <SoundProvider runAudio={audio}>
        <ThemeInitialProvider>
          <BankLoadingScreen />
          <AuthProvider
            onAuthSuccess={() => console.log('Успешная авторизация')}
          >
            <Layout>
              <Routing />
            </Layout>
          </AuthProvider>
        </ThemeInitialProvider>
      </SoundProvider>
    </>
  )
}

export default App
