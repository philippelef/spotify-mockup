import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { PlayProvider } from '../context/PlayContext'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlayProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </PlayProvider>
  )
}

export default MyApp
