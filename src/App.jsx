import '@styles/index.css'
import { Routing } from '@routes'
import { Layout } from '@components/layout'
import { AuthProvider } from '@components/providers/auth.provider'
import { SoundProvider } from '@components/providers/sound.provider'
import audio from './assets/audio/run.ogg'
import { ThemeInitialProvider } from '@components/providers/theme.initial.provider'
// import stone from './assets/audio/stone.mp3'

function App() {
  return (
    // <SoundProvider runAudio={audio}>
    <ThemeInitialProvider>
      <AuthProvider onAuthSuccess={() => console.log('Успешная авторизация')}>
        <Layout>
          <Routing />
        </Layout>
      </AuthProvider>
    </ThemeInitialProvider>
    // </SoundProvider>
  )
}

export default App
