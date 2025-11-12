import '@shared/styles/index.css'
import { Layout } from '@shared/layouts/layout'
import { AuthProvider } from '@shared/providers/auth.provider'
import { SoundProvider } from '@shared/providers/sound.provider'
import { ThemeInitialProvider } from '@shared/providers/theme.initial.provider'
import { BankLoadingScreen } from '@shared/providers/screen.loading'
import audio from '@shared/assets/audio/run.ogg'
import { Routing } from '@shared/routes'
// import stone from './assets/audio/stone.mp3'

function App() {
  return (
    <>
      {/* <SoundProvider runAudio={audio}> */}
      <ThemeInitialProvider>
        <BankLoadingScreen />
        <AuthProvider onAuthSuccess={() => console.log('Успешная авторизация')}>
          <Layout>
            <Routing />
          </Layout>
        </AuthProvider>
      </ThemeInitialProvider>
      {/* </SoundProvider> */}
    </>
  )
}

export default App
