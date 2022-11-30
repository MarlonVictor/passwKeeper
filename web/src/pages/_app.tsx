import type { AppProps } from 'next/app'
import { Toaster } from 'react-hot-toast';

import { AuthContextProvider } from '../contexts/AuthContext'

import '../styles/global.css'


function App({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <Toaster
        position='top-right'
        toastOptions={{
          style: {
            background: '#393E46',
            color: '#EEE',
          },
        }}
      />

      <Component {...pageProps} />
    </AuthContextProvider>
  )
}

export default App