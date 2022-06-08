import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PlayProvider } from '../context/PlayContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayProvider>
      <Component {...pageProps} />
    </PlayProvider>
  )
}

export default MyApp
