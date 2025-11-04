import '@styles/index.css'
import { Routing } from '@routes/'
import { Layout } from '@components/layout'
import React from 'react';
import { AuthProvider } from '@components/providers/auth.provider';

function App() {

  return (
    <AuthProvider onAuthSuccess={() => console.log('Успешная авторизация')}>
      <Layout>
        <Routing/>
      </Layout>
    </AuthProvider>
  )
}

export default App